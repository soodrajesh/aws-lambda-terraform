# 🚀 AWS Lambda Web App with Terraform

A modern, serverless web application deployed on AWS Lambda and API Gateway, fully managed with Terraform. This project demonstrates best practices for building and deploying serverless applications with infrastructure as code.

## ✨ Features

- **Serverless Architecture**: Built on AWS Lambda and API Gateway
- **Infrastructure as Code**: Managed with Terraform
- **Modern Web Interface**: Responsive, mobile-friendly UI
- **RESTful API**: Well-structured endpoints with proper HTTP methods
- **CORS Support**: Pre-configured for web applications
- **Environment-Aware**: Different configurations for development/production

## 🏗️ Project Structure

```
.
├── .gitignore          # Git ignore rules
├── README.md           # This file
├── index.js            # Lambda function source code
├── main.tf             # Main Terraform configuration
├── locals.tf           # Local variables and configurations
└── package.json        # Node.js dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- [Terraform](https://www.terraform.io/downloads.html) (v1.0.0 or later)
- [AWS CLI](https://aws.amazon.com/cli/) configured with appropriate credentials
- [Node.js](https://nodejs.org/) (v18.x or later)
- AWS Account with appropriate permissions

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd aws-lambda-terraform
   ```

2. Initialize Terraform
   ```bash
   terraform init
   ```

### Deployment

1. Package the Lambda function
   ```bash
   zip -r lambda.zip index.js
   ```

2. Review the execution plan
   ```bash
   terraform plan
   ```

3. Deploy the infrastructure
   ```bash
   terraform apply
   ```
   Confirm with `yes` when prompted.

## 🌐 API Endpoints

- `GET /` - Homepage with documentation
- `GET /api/hello` - Simple greeting endpoint
- `GET /api/health` - Health check endpoint
- `GET /api/example/{id}` - Example endpoint with path parameters

### Example Requests

```bash
# Get a greeting
curl https://YOUR_API_GATEWAY_URL/api/hello

# Check API health
curl https://YOUR_API_GATEWAY_URL/api/health

# Example with path parameter
curl https://YOUR_API_GATEWAY_URL/api/example/123
```

## 🛠️ Development

### Local Development

1. Install dependencies (if any)
   ```bash
   npm install
   ```

2. Make your changes to `index.js`

3. Test changes locally using AWS SAM or AWS CLI

### Updating the Lambda Function

1. Make your code changes in `index.js`
2. Create a new deployment package
   ```bash
   zip -r lambda.zip index.js
   ```
3. Update the Lambda function
   ```bash
   aws lambda update-function-code \
     --function-name simple-web-app \
     --zip-file fileb://lambda.zip \
     --region eu-west-1 \
     --profile raj-private
   ```

## 🧹 Cleanup

To avoid unnecessary AWS charges, destroy all resources when done:

```bash
terraform destroy
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 Documentation

- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [API Gateway Documentation](https://docs.aws.amazon.com/apigateway/)

## 🔍 Troubleshooting

- **Deployment Issues**: Check CloudWatch logs for the Lambda function
- **API Gateway Errors**: Verify the integration with Lambda in the AWS Console
- **CORS Problems**: Ensure the `Access-Control-Allow-Origin` header is properly set in responses

## 📚 Command Reference

### Terraform Commands

```bash
# Initialize Terraform in the project directory
terraform init

# Check the execution plan
terraform plan

# Apply changes to create/update infrastructure
terraform apply

# Destroy all resources
terraform destroy

# Format Terraform files
terraform fmt

# Validate Terraform configuration
terraform validate

# Show the current state
terraform show
```

### AWS CLI Commands

```bash
# Update Lambda function code
aws lambda update-function-code \
  --function-name simple-web-app \
  --zip-file fileb://lambda.zip \
  --region eu-west-1 \
  --profile raj-private

# Invoke Lambda function directly
aws lambda invoke \
  --function-name simple-web-app \
  --payload '{"key": "value"}' \
  output.json \
  --region eu-west-1 \
  --profile raj-private

# View Lambda function configuration
aws lambda get-function-configuration \
  --function-name simple-web-app \
  --region eu-west-1 \
  --profile raj-private

# View Lambda function logs in CloudWatch
aws logs filter-log-events \
  --log-group-name /aws/lambda/simple-web-app \
  --region eu-west-1 \
  --profile raj-private

# List API Gateway APIs
aws apigatewayv2 get-apis \
  --region eu-west-1 \
  --profile raj-private

# Get API Gateway details
aws apigatewayv2 get-api \
  --api-id YOUR_API_ID \
  --region eu-west-1 \
  --profile raj-private

# Test API Gateway endpoint
curl https://YOUR_API_GATEWAY_URL/api/hello
```

### Common Workflows

#### Update and Deploy Lambda Function

```bash
# 1. Update your Lambda function code in index.js

# 2. Create a new deployment package
zip -r lambda.zip index.js

# 3. Update the Lambda function
aws lambda update-function-code \
  --function-name simple-web-app \
  --zip-file fileb://lambda.zip \
  --region eu-west-1 \
  --profile raj-private

# 4. Test the updated function
curl https://YOUR_API_GATEWAY_URL/api/hello
```

#### Update Infrastructure

```bash
# 1. Update your Terraform configuration files

# 2. Review changes
terraform plan

# 3. Apply changes
terraform apply

# 4. Verify deployment
curl https://YOUR_API_GATEWAY_URL/api/health
```
