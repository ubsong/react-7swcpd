import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import './style.css';
import Main from './Main';
import Sidebar from './Sidebar';

function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);

  //로컬스토리지에 저장
  useEffect(() => {
    notes && localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  //[추가] 오브젝트와 상태변경함수
  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: 'Untitled Note',
      body: '',
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
  };

  //[필터]기능으로 지울녀석을 빼고 다시 묶기
  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  //find 로 액티브한 노트만 찾아서 리턴할 모양인데
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  //notes의 상태를 업데이트 시켜주는구나
  //map 하는 와중에 id랑 액티브노트랑 같은가보고.. 같으면 새로운내용으로 note를 리턴해주네
  //그리곤 셋노트로 note를 업데이트해주면...모든곳에 notes가 새롭게노트 목록이 업데이트됨.
  //업데이트도 그저 상태의 변화일뿐이네... 언제 무엇으로 비교 리턴하는가의 문제일뿐.
  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArray);
  };

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />

      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
