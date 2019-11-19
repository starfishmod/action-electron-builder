const fs = require('fs');
const cp = require("child_process");

const github = require('@actions/github');
const core = require('@actions/core');

const ghRepo = process.env['GITHUB_REPOSITORY'].split('/');
const PACKAGE_JSON_PATH = "./package.json";
const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, "utf8"));
const runCmd = cmd => cp.execSync(cmd, { encoding: "utf8", stdio: "inherit" });


async function run() {
	// This should be a token with access to your repository scoped in as a secret.
	// The YML workflow will need to set myToken with the GitHub Secret Token
	// myToken: ${{ secrets.GITHUB_TOKEN }}
	// https://help.github.com/en/articles/virtual-environments-for-github-actions#github_token-secret

	console.log(`Installing dependencies using ${useNpm ? "NPM" : "Yarn"}…`);
	runCmd("yarn");

	// Run NPM build script if it exists
	console.log("Running the build script…");
	const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, "utf8"));
	runCmd("yarn build");

	const myToken = core.getInput('github_token');

	const octokit = new github.GitHub(myToken);

	console.log('look For Tag');
	var relData = await octokit.repos.getReleaseByTag({
		owner:ghRepo[0],
		repo:ghRepo[1],
		tag: packageJson.version
	});

	console.log('Tag release search results');
	console.log(relData);

	if(!relData){
		console.log('No Tag so create one');
		relData = await github.repos.createRelease({
			owner:ghRepo[0],
			repo:ghRepo[1],
			tag_name: packageJson.version,
			name:  packageJson.version,
			body: packageJson.version,
			target_commitish: core.getInput('branch'),
			draft:false,
			prerelease:false
		});
		console.log(relData);
	}

	if(relData && relData.upload_url){
		fs.readdir(process.cwd() + '/dist', function(err, items) {
			var filename = false;

			for (var i = 0; i < items.length; i++) {
				if (process.platform == 'darwin' && items[i].match(/.dmg$/)) {
					filename = items[i];
				} else if (process.platform == 'win32' && items[i].match(/.exe/)) {
					filename = items[i];
				} else if (process.platform == 'linux' && items[i].match(/.AppImage/)) {
					filename = items[i];
				}
			}

			var stats = fs.statSync(process.cwd() + '/dist/' + filename);
			var fileSizeInBytes = stats["size"];

			var success = octokit.repos.uploadReleaseAsset({
				file:fs.readFileSync(process.cwd() + '/dist/' + filename),
				headers:{
					'content-type': 'application/octet-stream',
					'content-length':fileSizeInBytes
				},
				name:filename,
				url:relData.upload_url
			});

		});

	}


}

run();











