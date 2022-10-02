import React from 'react'

//import Themes from 'react-ui-themes-superflows'
//import { Col, Row, Container } from 'react-bootstrap';
import { UploadToS3 } from 'react-upload-to-s3'
//import 'bootstrap/dist/css/bootstrap.min.css';

const UploadImagePost = () => {


    return (
        <div>
            <UploadToS3 
                bucket="vscoop-uploads"
                awsRegion="us-west-1"
                awsKey="AKIAQCFG5Q36VLMG6HOS"
                awsSecret="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"
                type="image"
                showNewUpload={false}
                onResult={(result) => {console.log('on Result', result);}} />
        </div>
            
     );

}

export default UploadImagePost;