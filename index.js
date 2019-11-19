const cp = require("child_process");
const fs = require('fs');
const request = require('request-promise');




const NPM_LOCKFILE_PATH = "./package-lock.json";
const PACKAGE_JSON_PATH = "./package.json";

/**
 * Logs to the console
 */
const log = msg => console.log(`\n${msg}`); // eslint-disable-line no-console

/**
 * Exits the current process with an error code and message
 */
const exit = msg => {
	console.error(msg);
	process.exit(1);
};

/**
 * Executes the provided shell command and redirects stdout/stderr to the console
 */
const run = cmd => cp.execSync(cmd, { encoding: "utf8", stdio: "inherit" });

/**
 * Returns whether NPM should be used to run commands (instead of Yarn, which is the default)
 */
const useNpm = fs.existsSync(NPM_LOCKFILE_PATH);

/**
 * Exits if the `package.json` file is missing
 */
const verifyPackageJson = () => {
	if (!fs.existsSync(PACKAGE_JSON_PATH)) {
		exit("Missing `package.json` file");
	}
};

/**
 * Determines the current operating system (one of ["mac", "windows", "linux"])
 */
const getPlatform = () => {
	switch (process.platform) {
		case "darwin":
			return "mac";
		case "win32":
			return "windows";
		default:
			return "linux";
	}
};

/**
 * Parses the environment variable with the provided name. If `required` is set to `true`, the
 * program exits if the variable isn't defined
 */
const getEnvVariable = (name, required = false) => {
	const value = process.env[`INPUT_${name.toUpperCase()}`];
	if (required && (value === undefined || value === null || value === "")) {
		exit(`"${name}" input variable is not defined`);
	}
	return value;
};

/**
 * Sets the specified env variable if the value isn't empty
 */
const setEnvVariable = (name, value) => {
	if (value !== null && value !== undefined && value !== "") {
		process.env[name] = value.toString();
	}
};

/**
 * Installs NPM dependencies and builds/releases the Electron app
 */
const runAction = () => {
	const platform = getPlatform();
	const release = getEnvVariable("release") === "true";
	const GITHUB_REPOSITORY = process.env['GITHUB_REPOSITORY'];
	const ghtoken = getEnvVariable("github_token", true);

	// Make sure `package.json` file exists
	verifyPackageJson();

	// Copy "github_token" input variable to "GH_TOKEN" env variable (required by `electron-builder`)
	//setEnvVariable("GH_TOKEN", getEnvVariable("github_token", true));

	// Require code signing certificate and password if building for macOS. Export them to environment
	// variables (required by `electron-builder`)
	if (platform === "mac") {
		//setEnvVariable("CSC_LINK", getEnvVariable("mac_certs"));
		//setEnvVariable("CSC_KEY_PASSWORD", getEnvVariable("mac_certs_password"));
	} else if (platform === "windows") {
		//setEnvVariable("CSC_LINK", getEnvVariable("windows_certs"));
		//	setEnvVariable("CSC_KEY_PASSWORD", getEnvVariable("windows_certs_password"));
	}

	// Disable console advertisements during install phase
	setEnvVariable("ADBLOCK", true);

	log(`Installing dependencies using ${useNpm ? "NPM" : "Yarn"}…`);
	run("yarn");

	// Run NPM build script if it exists
	log("Running the build script…");
	const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, "utf8"));
	run("yarn build");


	log(`${release ? "Releasing" : "Building"} the Electron app…`);
	if(release){
		fs.readdir(process.cwd()+'/dist', function(err, items) {
			var filename=false;

			for (var i=0; i<items.length; i++) {
					if(platform=='mac' && items[i].match(/.dmg$/)){
						filename = items[i];
					}else if(platform=='windows' && items[i].match(/.exe/)){
						filename = items[i];
					}else if(platform=='linux' && items[i].match(/.AppImage/)){
						filename = items[i];
					}
			}
			
			
			if(filename){
				
				//https://uploads.github.com/repos/${GITHUB_REPOSITORY}/releases/${RELEASE_ID}/assets?name=${FILENAME}
		
					

					const options = {
							method: 'PUT',
							url: 'https://uploads.github.com/repos/'+GITHUB_REPOSITORY+'/releases/'+packageJson.version+'/assets',
							qs: {name: filename}, // optional 
							headers: {
									'content-type': 'application/octet-stream',
									'authorization': 'token '+ghtoken
							}
					};

					fs.createReadStream(process.cwd()+'/dist/'+filename).pipe(request(options)).then(body =>{
							console.log(body);
					})
					.catch(err => {
							console.log(err);
					});
				
			}
	});
		
		
		

		
	}
};

runAction();
