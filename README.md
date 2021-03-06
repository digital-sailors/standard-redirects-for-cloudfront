# standard-redirects-for-cloudfront

A Lambda@Edge function that implements standard web server redirects that simplify directory handling.

For example, requests for URI paths that end in "/" are rewritten into "/index.html" before the request is passed on to the CloudFront Origin. You may think of that as an "internal" redirect in webserver terms.

URI paths that end in ".../index.html" are redirected to ".../" with an HTTP status code 301 (Moved Permanently). This is the same as an "external" redirect by a webserver.

URI paths that do not have an extension and do not end with a "/" are redirected to the same path with an appended "/" with an HTTP status code 301 (Moved Permanently). This is again an "external" redirect. (This may hide actual content from the Origin, if you use paths without extensions!).

## Examples

  /foo/bar/ -> internal redirect -> /foo/bar/index.html
  /foo -> external redirect (301) -> /foo/ -> internal redirect -> /foo/index.html
  /foo.html -> no redirect
  /foo/bar.html -> no redirect
  /foo/index.html -> external redirect (301) -> /foo/

## Notes

This URL scheme is somewhat opinionated. It tries to balance SEO requirements with server-side tooling. (E.g. S3 tooling tries to infer the content-type from the file extension.)

It allows you to have very nice outward facing URLs like "/cooltopic", that internally use a file with a correct extension: "cooltopic/index.html". To have content other than index.html in a folder, you need to expose the file extension: "/cooltopic/somecontent.html"

Make sure that your CloudFront distribution handles the URL "/" directly by having the property "Default Root Object" set to "index.html".

## Updating

### Lambda Runtime

This package uses the `nodejs10.x` Node.js 10 Runtime. Updating the package in your AWS account requires one manual step, which is outlined below.

### Procedure

1. Install the application "standard-redirects-for-cloudfront".
2. Go to the Cloudformation Console
3. Select the Output Value, this is the ARN (including the version) for the Lambda function.
4. In CloudFront edit a **Behaviour** and add a **Lambda Function Association** with the *Event Type* "Origin Request" and enter the Lambda function ARN from the previous step.
5. Wait for the CloudFront distribution to deploy.

## Installation

### Installation via the Serverless Application Repository

1. Install the application "standard-redirects-for-cloudfront".
2. Go to the Cloudformation Console
3. Select the Output Value, this is the ARN (including the version) for the Lambda function.
4. In CloudFront edit a **Behaviour** and add a **Lambda Function Association** with the *Event Type* "Origin Request" and enter the Lambda function ARN from the previous step.
5. Wait for the CloudFront distribution to deploy.

### Contact

For any questions or comments, do contact us!

Email: contact@digital-sailors.de
Web: https://www.digital-sailors.de/

Enjoy!
