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
    pdfjs.getDocument({ data: preFile[0].filetext }).promise.then((doc) => {
      const { _pdfInfo } = doc;
      console.log(`This file has ${_pdfInfo.numPages} pages`);
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
    <div>
      <ScrollToBottom className="">
        <p style={{ maxHeight: '300px' }}>{page}</p>
      </ScrollToBottom>
      <Navbar bg="dark" variant="dark" className="page-btn">
        <button type="submit" onClick={() => { renderPDF(file, false); }}>Prev Page</button>
        <button type="submit" onClick={() => { renderPDF(file, true); }}>Next Page</button>
      </Navbar>
    </div>
  );
}

export default File;
