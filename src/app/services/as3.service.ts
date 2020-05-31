import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

const AWSService = window.AWS;

@Injectable()
export class As3Service {

  private bucket: any;

  constructor() {
    AWSService.config.accessKeyId = environment.AWSAccessKeyId;
    AWSService.config.secretAccessKey = environment.AWSSecretAccessKey;

    this.bucket = new AWSService.S3();

  }


  uploadMedia(medias) {


    const obs = [];

    if ( !(medias instanceof Array) ) {
      medias = medias[0];
    }

    let i = 0;
    for (let media of medias) {

      let curr = i++;

      let params = {
        Key: media.fileName,
        Body: media.file,
        ACL: 'public-read',
        Bucket: environment.AWSBucket
      };
      
      obs.push(Observable.create( (observer: Observer<any>) => {
        this.bucket.putObject(params, (error, res) => {
          if (res) {
            let path = `https://s3.amazonaws.com/${environment.AWSBucket}/${media.fileName}`;

            observer.next({
              path,
              index: curr,
            });
          }

          if (error) {
            observer.error(false);
          }

          observer.complete();
        });
      }));
    }

    return Observable.forkJoin(
      ...obs,
    ).map( (res: any[]) => {
      console.log(res);
      return res.sort(function(a, b) {
        return (a.index - b.index);
      });
    });

  }
}
