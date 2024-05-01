import { IFunction } from 'aws-cdk-lib/aws-lambda';
import {
  SnsEventSource,
  SnsEventSourceProps
} from 'aws-cdk-lib/aws-lambda-event-sources';
import { Topic } from 'aws-cdk-lib/aws-sns';

export function topicToFunction(
  source: Topic,
  target: IFunction,
  props?: SnsEventSourceProps
) {
  target.addEventSource(new SnsEventSource(source, props));
}
