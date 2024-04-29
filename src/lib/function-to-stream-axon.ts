import { Stream } from 'aws-cdk-lib/aws-kinesis';
import { Function as LambdaFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { merge } from 'lodash';

export type FunctionToStreamAxonProps = {
  streamEnvironmentVariableName?: string;
};

export class FunctionToStreamAxon extends Construct {
  constructor(
    scope: Construct,
    id: string,
    source: LambdaFunction,
    target: Stream,
    props?: FunctionToStreamAxonProps
  ) {
    super(scope, id);
    const propsWithdefaults = merge(
      {
        streamEnvironmentVariableName: 'STREAM_NAME'
      },
      props
    );
    source.addEnvironment(
      propsWithdefaults.streamEnvironmentVariableName,
      target.streamName
    );
    target.grantWrite(source.grantPrincipal);
    target.encryptionKey?.grant(
      source.grantPrincipal,
      'kms:Decrypt',
      'kms:GenerateDataKey*'
    );
  }
}
