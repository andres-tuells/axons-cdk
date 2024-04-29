import { IFunction } from 'aws-cdk-lib/aws-lambda';
import {
  SnsEventSource,
  SnsEventSourceProps
} from 'aws-cdk-lib/aws-lambda-event-sources';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';

export class TopicToFunctionAxon extends Construct {
  constructor(
    scope: Construct,
    id: string,
    source: Topic,
    target: IFunction,
    props?: SnsEventSourceProps
  ) {
    super(scope, id);
    target.addEventSource(new SnsEventSource(source, props));
  }
}
