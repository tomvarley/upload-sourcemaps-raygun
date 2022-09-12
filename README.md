# GitHub Action: upload-sourcemaps-raygun

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/tomvarley/upload-sourcemaps-raygun/build-test?style=flat-square)](https://github.com/tomvarley/upload-sourcemaps-raygun/actions/workflows/test.yml) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![codecov](https://img.shields.io/codecov/c/github/tomvarley/upload-sourcemaps-raygun?style=flat-square)](https://codecov.io/gh/tomvarley/upload-sourcemaps-raygun)

Github action to take sourcemaps generated as part of the build process and upload them to Raygun, using the process documented here: https://raygun.com/documentation/product-guides/crash-reporting/sourcemaps/#uploading-javascript-files.

## Usage

```yaml
steps:
  - name: Upload sourcemap to Raygun
    uses: tomvarley/upload-sourcemaps-raygun@v1
    with:
      token: abc123  # Your Raygun external access token
      project_id: 123xyz #Raygun app identifier, found under Application Settings -> JS source map center
      base_url: https://www.fancyapp.com/release/V2/static/js/
      folder: ./sourcemaps # Location to recursively search for sourcemaps with .js.map extension
```
