import { Stream } from 'aws-cdk-lib/aws-kinesis';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import {
  KinesisEventSource,
  KinesisEventSourceProps
} from 'aws-cdk-lib/aws-lambda-event-sources';

export function streamToFunction(
  source: Stream,
  target: IFunction,
  props?: KinesisEventSourceProps
) {
  target.addEventSource(new KinesisEventSource(source, props));
}
