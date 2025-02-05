@Library('global-pipeline') _

GlobalPipeline() {
	dockerImage = "nephren-blogs:latest"
	projectName = "nephren-blogs"
	appPort = "8001"
    networkName = "nephren-ui"
    buildArgs = [
        VITE_GOOGLE_TAG: "${this.env.VITE_GOOGLE_TAG}"
    ]
}
