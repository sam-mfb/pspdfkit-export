const fs = require("fs-extra")
const path = require("path")

const srcPath = path.join(
  process.cwd(),
  "node_modules/pspdfkit/dist/pspdfkit-lib"
)

function copyPspdfkitFiles() {
  const targetPath = path.join(process.cwd(), "public/pspdfkit-lib")

  fs.removeSync(targetPath)
  fs.copySync(srcPath, targetPath)
}

function verifyPspdfkitInstall() {
  try {
    require("pspdfkit")
  } catch (error) {
    if (/cannot find module/i.test(error.message)) {
      console.log(
        "\x1b[31m",
        `This application requires you to install PSPDFKit for Web. For further instructions please refer to the online guide available at: https://pspdfkit.com/guides/web/current/standalone/adding-to-your-project#toc_install-with-npm.\n`,
        "\x1b[0m"
      )
    }
  }
}

;(() => {
  verifyPspdfkitInstall()
  copyPspdfkitFiles()
})()
