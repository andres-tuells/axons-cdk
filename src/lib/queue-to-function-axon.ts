import { IFunction } from 'aws-cdk-lib/aws-lambda';
import {
  SqsEventSource,
  SqsEventSourceProps
} from 'aws-cdk-lib/aws-lambda-event-sources';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

export class QueueToFunctionAxon extends Construct {
  constructor(
    scope: Construct,
    id: string,
    source: Queue,
    target: IFunction,
    props?: SqsEventSourceProps
  ) {
    super(scope, id);
    target.addEventSource(new SqsEventSource(source, props));
  }
}
