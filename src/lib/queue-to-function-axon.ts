import { IFunction } from 'aws-cdk-lib/aws-lambda';
import {
  SqsEventSource,
  SqsEventSourceProps
} from 'aws-cdk-lib/aws-lambda-event-sources';
import { Queue } from 'aws-cdk-lib/aws-sqs';

export function queueToFunction(
  source: Queue,
  target: IFunction,
  props?: SqsEventSourceProps
) {
  target.addEventSource(new SqsEventSource(source, props));
}
