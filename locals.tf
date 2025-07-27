# Define local file for the Lambda function
resource "local_file" "index_js" {
  filename = "${path.module}/index.js"
  content  = file("${path.module}/index.js")
}
