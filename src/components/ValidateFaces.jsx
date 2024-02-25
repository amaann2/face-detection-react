import * as faceapi from 'face-api.js'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const ValidateFaces = () => {
    const videoRef = useRef()
    const canvasRef = useRef()
    const navigate = useNavigate()

    //load from useeffect
    useEffect(() => {
        startVideo()
        videoRef && loadModel()
    }, [])
    // open a face webcam
    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true }).then((currentStream) => {
            videoRef.current.srcObject = currentStream
        }).catch((err) => {
            console.log(err)
        })
    }

    // load model from face api
    const loadModel = () => {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
            faceapi.nets.faceExpressionNet.loadFromUri('./models')
        ]).then(() => {
            faceMyDetect()
        })
    }


    const faceMyDetect = () => {
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(videoRef.current,
                new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()


            // Draw you face in webcam
            canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current)
            faceapi.matchDimensions(canvasRef.current, {
                width: 940,
                height: 650
            })

            const resized = faceapi.resizeResults(detections, {
                width: 940,
                height: 650
            })

            faceapi.draw.drawDetections(canvasRef.current, resized)
            faceapi.draw.drawFaceLandmarks(canvasRef.current, resized)
            faceapi.draw.drawFaceExpressions(canvasRef.current, resized)


            if (detections.length > 0) {
                navigate('/home');
                alert('Face validated !! navigation to home page')
            }
        }, 1000)
    }
    return (
        <div className='myapp'>
            <h1>Face detection</h1>
            <div className="appvide">

                <video crossOrigin='anonymous' ref={videoRef} autoPlay></video>
            </div>
            <canvas ref={canvasRef} width='940' height='650' className='appcanvas' />
        </div>
    )
}

export default ValidateFaces