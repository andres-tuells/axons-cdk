import { Function as LambdaFunction } from 'aws-cdk-lib/aws-lambda';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export type FunctionToSecretAxonProps = {
  secretEnvironmentVariableName?: string;
};

export class FunctionToSecretAxon extends Construct {
  constructor(
    scope: Construct,
    id: string,
    source: LambdaFunction,
    target: Secret,
    props?: FunctionToSecretAxonProps
  ) {
    super(scope, id);
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
}
