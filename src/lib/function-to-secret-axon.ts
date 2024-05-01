import { Function as LambdaFunction } from 'aws-cdk-lib/aws-lambda';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';

export type FunctionToSecretAxonProps = {
  secretEnvironmentVariableName?: string;
};

export function functionToSecret(
  source: LambdaFunction,
  target: Secret,
  props?: FunctionToSecretAxonProps
) {
  const propsWithdefaults = {
    secretEnvironmentVariableName: 'SECRET_ARN',
    ...props
  };
  source.addEnvironment(
    propsWithdefaults.secretEnvironmentVariableName,
    target.secretArn
  );
  target.grantRead(source);
}
