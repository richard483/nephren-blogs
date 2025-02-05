@Library('global-pipeline') _

GlobalPipeline() {
	dockerImage = "nephren-blogs:latest"
	projectName = "nephren-blogs"
	appPort = "3000"
    buildArgs = [
        VITE_GOOGLE_TAG: "${this.env.VITE_GOOGLE_TAG}"
    ]
}
