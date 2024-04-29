import { Stream } from 'aws-cdk-lib/aws-kinesis';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import {
  KinesisEventSource,
  KinesisEventSourceProps
} from 'aws-cdk-lib/aws-lambda-event-sources';
import { Construct } from 'constructs';

export class StreamToFunctionAxon extends Construct {
  constructor(
    scope: Construct,
    id: string,
    source: Stream,
    target: IFunction,
    props?: KinesisEventSourceProps
  ) {
    super(scope, id);
    target.addEventSource(new KinesisEventSource(source, props));
  }
}
