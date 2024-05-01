import { IFunction } from 'aws-cdk-lib/aws-lambda';
import {
  S3EventSourceProps,
  S3EventSourceV2
} from 'aws-cdk-lib/aws-lambda-event-sources';
import { Bucket } from 'aws-cdk-lib/aws-s3';

export function bucketToFunction(
  source: Bucket,
  target: IFunction,
  props?: S3EventSourceProps
) {
  target.addEventSource(new S3EventSourceV2(source, props));
  source.grantRead(target);
}
