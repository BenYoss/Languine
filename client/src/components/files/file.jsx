import React, { useState, useEffect } from 'react';
import query from 'query-string';
import { pdfjs } from 'react-pdf';
import { Navbar } from 'react-bootstrap';
import ScrollToBottom from 'react-scroll-to-bottom';
import { getFile } from '../../helpers/helpers';
import 'bootstrap/dist/css/bootstrap.min.css';

let counter = 1;
function File() {
  const [file, setFile] = useState([]);
  const [page, setPage] = useState('');
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  useEffect(() => {
    const { id } = query.parse(window.location.search);

    getFile(id)
      .then((fileData) => {
        setFile(fileData);
      })
      .catch((err) => console.error(err));
  }, []);
  const renderPDF = (preFile, bool) => {
    pdfjs.getDocument({ url: preFile.filetext }).promise.then((doc) => {
      const { _pdfInfo } = doc;
      if (bool) {
        counter += 1;
      } else {
        counter -= 1;
      }
      if (counter > _pdfInfo.numPages) {
        counter = _pdfInfo.numPages;
      }
      if (counter < 1) {
        counter = 1;
      }
      doc.getPage(counter).then((pageData) => {
        const canvas = document.getElementById('pdf-canvas');
        const context = canvas.getContext('2d');
        const vport = pageData.getViewport({ scale: counter });
        canvas.width = vport.width;
        canvas.height = vport.height;

        pageData.render({
          canvasContext: context,
          viewport: vport,
        });

        pageData.getTextContent()
          .then((data) => {
            const joiner = [];
            data.items.forEach((text) => {
              joiner.push(text.str);
            });
            setPage(joiner.join(''));
          });
      });
    })
      .catch((err) => console.error(err));
  };

  return (
    <div className="mt-6">
      <h4 className="text-center">{file.title}</h4>
      <Navbar bg="dark" variant="dark" className="page-btn text-black bg-light my-5 py-4">
        <button type="submit" onClick={() => { renderPDF(file, false); }}>Prev Page</button>
        <p className="text-white  ml-4 mr-4">{`pg: ${counter}`}</p>
        <button type="submit" onClick={() => { renderPDF(file, true); }}>Next Page</button>
      </Navbar>
      <div className="d-flex justify-content-between mt-6">
        <ScrollToBottom className="">
          <div>
            <p style={{ maxHeight: '300px', maxWidth: '400px' }}>{page}</p>
          </div>
        </ScrollToBottom>
        <ScrollToBottom className="">
          <div style={{ maxHeight: '600px' }}>
            <canvas id="pdf-canvas" style={{ maxWidth: '700px' }} />
          </div>
        </ScrollToBottom>
      </div>
    </div>
  );
}

export default File;
