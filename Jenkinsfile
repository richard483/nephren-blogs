@Library('global-pipeline') _

GlobalPipeline() {
	dockerImage = "nephren-blogs:latest"
	projectName = "nephren-blogs"
	appPort = "7001"
    networkName = "nephren-ui"
    buildArgs = [
        VITE_GITHUB_TOKEN: "${this.env.VITE_GITHUB_TOKEN}"
    ]
}
