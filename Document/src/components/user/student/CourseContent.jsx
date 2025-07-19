import React, { useEffect, useState, useContext } from 'react';
import axiosInstance from '../../helper/axios';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Button, Modal } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { UserContext } from '../../App';

const CourseContent = () => {
  const [courseContent, setCourseContent] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [playingSectionIndex, setPlayingSectionIndex] = useState(null);
  const [completedSections, setCompletedSections] = useState([]);
  const [completedModule, setCompletedModule] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [certificate, setCertificate] = useState(null);

  const { id } = useParams();
  const user = useContext(UserContext);

  const getCourseContent = async () => {
    try {
      const response = await axiosInstance.get(`/api/user/coursecontent/${id}`);
      setCourseContent(response.data.course.section);
      setCompletedModule(response.data.completed);
      setCertificate(response.data.course.certificate);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseContent();
  }, [id]);

  const handlePlay = (videoUrl, index) => {
    setCurrentVideo(videoUrl);
    setPlayingSectionIndex(index);
  };

  const handleComplete = async (sectionId) => {
    try {
      const response = await axiosInstance.post('/api/user/completemodule', {
        courseId: id,
        moduleId: sectionId,
      });

      if (response.data.success) {
        alert('Module marked as completed!');
        setCompletedSections([...completedSections, sectionId]);
        getCourseContent(); // refresh completed list
      } else {
        alert('Failed to mark module as completed.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const downloadCertificate = () => {
    const input = document.getElementById('certificate-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10);
      pdf.save('certificate.pdf');
    });
  };

  const allModulesCompleted = courseContent.length > 0 && completedModule.length === courseContent.length;

  return (
    <div className='container my-5'>
      <h3 className='text-center mb-4'>Course Content</h3>
      <div className='row'>
        <div className='col-md-6'>
          {courseContent.map((section, index) => (
            <div key={section._id} className='mb-3 border p-3 rounded shadow-sm'>
              <h5>{section.title}</h5>
              <p>{section.description}</p>
              <Button variant='primary' size='sm' className='me-2' onClick={() => handlePlay(section.video, index)}>
                Play Video
              </Button>
              <Button
                variant='success'
                size='sm'
                disabled={playingSectionIndex !== index || completedModule.includes(section._id)}
                onClick={() => handleComplete(section._id)}
              >
                {completedModule.includes(section._id) ? 'Completed' : 'Mark Completed'}
              </Button>
            </div>
          ))}
        </div>

        <div className='col-md-6'>
          {currentVideo ? (
            <div className='player-wrapper'>
              <ReactPlayer url={currentVideo} controls width='100%' />
            </div>
          ) : (
            <p className='text-muted'>Click "Play Video" to start watching a module.</p>
          )}
        </div>
      </div>

      {/* Show Certificate */}
      {allModulesCompleted && (
        <div className='text-center mt-5'>
          <h4>Congratulations! You have completed this course.</h4>
          <Button variant='info' onClick={handleShowModal}>
            View Certificate
          </Button>
        </div>
      )}

      {/* Certificate Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Course Completion Certificate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id='certificate-content' className='p-4 text-center' style={{ backgroundColor: '#f8f9fa' }}>
            <h1 style={{ fontFamily: 'serif', fontWeight: 'bold' }}>Certificate of Completion</h1>
            <p>This certificate is proudly presented to</p>
            <h2>{user?.userData?.name}</h2>
            <p>for successfully completing the course.</p>
            <p>Date: {new Date(certificate).toLocaleDateString()}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant='success' onClick={downloadCertificate}>
            Download PDF
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CourseContent;


