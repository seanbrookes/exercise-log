import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './App.css';

const sampleSession = {
  2342342342: {
    sessionId: '2342342342',
    plan: {
      chest: {
        5: {
          exercise: 'bench press',
          weight: 100,
          reps: 12
        },
        6: {
          exercise: 'bench press',
          weight: 105,
          reps: 10
        },
        7: {
          exercise: 'bench press',
          weight: 110,
          reps: 8
        },
        8: {
          exercise: 'bench press',
          weight: 110,
          reps: 6
        },
        9: {
          exercise: 'bench press',
          weight: 80,
          reps: 12
        },
        10: {
          exercise: 'bench press',
          weight: 70,
          reps: 12
        }
      }
    },
    actual: {
      chest: {
        5: {
          exercise: 'bench press',
          weight: 100,
          reps: 12
        },
        6: {
          exercise: 'bench press',
          weight: 105,
          reps: 10
        },
        7: {
          exercise: 'bench press',
          weight: 110,
          reps: 8
        },
        8: {
          exercise: 'bench press',
          weight: 110,
          reps: 6
        },
        9: {
          exercise: 'bench press',
          weight: 80,
          reps: 12
        },
        10: {
          exercise: 'bench press',
          weight: 70,
          reps: 12
        }
      }      
    }

  }
};

const exerciseTypes = [
  'back',
  'biceps',
  'chest',
  'shoulders',
  'triceps',
  'quads'
];

// takes a date object and returns a key
// daymonthyear
// 2020:11:25
const getDateRef = (date) => {
  if (!date) {
    return;
  }
  
  const returnValue = `${date.getFullYear()}:${(date.getMonth() + 1)}:${date.getDate()}`;
  console.log('getDateRef', returnValue);
  return returnValue;
};
const getBuiltDate = (dateString) => {
  const dateArray = dateString.split(':');
  const builtDate = new Date(dateArray[0], dateArray[1], dateArray[2]);
  return builtDate;
};

const months = {
  1: 'Jan',
  2: 'Feb',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'Aug',
  9: 'Sept',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec'
};

var weekday = new Array(7);
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thur";
weekday[5] = "Fri";
weekday[6] = "Sat";

const getFriendlyDateString = (dateKey) => {
  if (!dateKey) {
    return '';
  }
  const collection = dateKey.split(':');
  return `${months[collection[1]]} ${collection[2]}`;
};

const exercises = {
  biceps: [
    'bar curls',
    'dumbell curls'
  ],
  chest: [
    'bench press',
    'flys'
  ],
  shoulders: [
    'shoulder press',
    'side raise',
    'standing press'
  ],
  back: [
    'pullovers',
    'chinups'
  ],
  triceps: [
    'dips',
    'extensions'
  ],
  quads: [
    'bar squats',
    'dumbell squats'
  ]
};

const intensity = [
  5, 6, 7, 8, 9, 10
]
const reps = {
  5:12, 6:10, 7:8, 8:6, 9:12, 10:12
};

const saveWorkingData = (data) => {
  if (data) {
    localStorage.setItem('bflData', JSON.stringify(data));
  }
};

const guid = () => {
  let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
  }
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

const App = () => {
  const [sessionId, setSessionId] = useState('');
  const [workingData, setWorkingData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isShowCalendar, setIsShowCalendar] = useState(true);
  const [currentSession, setCurrentSession] = useState({});

  const refreshWorkingData = () => {
    const storedData = localStorage.getItem('bflData');
    if (storedData) {
      setWorkingData(JSON.parse(storedData, null, 4));
    }
    else {
      setWorkingData({});      
    }
  };

  const getDefaultExercise = (exerciseType) => {
    return exercises[exerciseType][0];

    // switch(exerciseType) {
    //   case 'back':
    //     break;
    //   case 'biceps':
    //     break;

    //   case 'chest':

    //   break;
    //   case 'shoulders':
    //     break;
    //   case 'triceps':
    //     break;
    //   case 'quads':
    //     break;
    //   default:

    // };
  }



  useEffect(() => {
    refreshWorkingData();
  }, []);


  const onDateSelect = (date) => {
    console.log('onSelectDate', date);
    const dateRef = getDateRef(date);
    console.log('dateRef', dateRef);
    const builtDate = getBuiltDate(dateRef);
    console.log('builtDate', builtDate);
    setSelectedDate(date);
    setIsShowCalendar(false);
    setSessionId(dateRef);



    // establish the date
    // load the working data
    // determine if session exists
    // if session does not exist create it
    if (!workingData[dateRef]) {
      workingData[dateRef] = {plan: {}, actual: {}, timestamp: new Date().getTime()};

    }
    saveWorkingData(workingData);
    setCurrentSession(workingData[dateRef]);
  };

  const showCalendar = () => {
    setIsShowCalendar(true);
  }

  // const startSession = () => {
  //   console.log('start session');
  //   const newSessionId = getDateRef(new Date());
  //   workingData[newSessionId] = {
  //     startTime: new Date().getTime(),
  //     sessionId: newSessionId
  //   };
  //   saveWorkingData(workingData);
  //   setWorkingData(workingData);

  //   setSessionId(newSessionId);

  // };
  // const endSession = () => {
  //   console.log('end session');
  //   setSessionId('');
  // };

  const loadSession = (event) => {
    const targetSessionKey = event.target.value;
    setSessionId(targetSessionKey);
    setCurrentSession(workingData[targetSessionKey]);
    setIsShowCalendar(false);
  }


  const setExerciseType = (event) => {
    console.log('setExerciseType', event.target.value);
  };


  const ExerciseBlock = ({type, mode, session}) => {
    const [defaultExercise, setDefaultExercise] = useState('');
    const [levelExercise, setLevelExercise] = useState({});

    const exerciseTypeData = currentSession[mode][type];
    const exerciseTypeDataKeys = Object.keys(exerciseTypeData);
    const wtf = Array.isArray(exerciseTypeDataKeys);

    const setExercise = (value, level) => {
      console.log('setExercise', value);
      if (level === 5) {
        // set default value
      }
      else {
        // for all others, updating the exercise only updates the one entry
      }
    };

    const ExerciseSelect = ({type = 'chest', value, level, onSelectExercise}) => {
      if (exercises && exercises[type] && exercises[type].map) {
        const options = exercises[type].map((item) => {
          return (<option key={item} value={item}>{item}</option>);
        })
        return (
          <select value={value} onChange={onSelectExercise}>
            {options}
          </select>
        );
      }
      console.log('| something not right Exercise Select no exercises[type].map', type);
  

    };
    const updateIntensityExercise = (value, level, type, isPlan) => {
      if (currentSession) {
        if (level === 5) {
          // set all of them
          currentSession[`${isPlan ? 'plan' : 'actual'}`][type]['5'].exercise = value;
          currentSession[`${isPlan ? 'plan' : 'actual'}`][type]['6'].exercise = value;
          currentSession[`${isPlan ? 'plan' : 'actual'}`][type]['7'].exercise = value;
          currentSession[`${isPlan ? 'plan' : 'actual'}`][type]['8'].exercise = value;
          currentSession[`${isPlan ? 'plan' : 'actual'}`][type]['9'].exercise = value;
          currentSession[`${isPlan ? 'plan' : 'actual'}`][type]['10'].exercise = value;

        }
        else {
          currentSession[`${isPlan ? 'plan' : 'actual'}`][type][level].exercise = value;
        }
        workingData[sessionId] = currentSession;
        saveWorkingData(workingData);
        refreshWorkingData();
      }
      console.log('updateIntensityExercise', value);

    };
    const updateIntensityWeight = (value, level, type, isPlan) => {
      if (currentSession) {
        if (level === 5) {
          // set all of them
          currentSession[`${isPlan ? 'plan' : 'actual'}`][type]['5'].weight = value;
          currentSession[`${isPlan ? 'plan' : 'actual'}`][type]['6'].weight = value;
          currentSession[`${isPlan ? 'plan' : 'actual'}`][type]['7'].weight = value;
          currentSession[`${isPlan ? 'plan' : 'actual'}`][type]['8'].weight = value;
          currentSession[`${isPlan ? 'plan' : 'actual'}`][type]['9'].weight = value;
          currentSession[`${isPlan ? 'plan' : 'actual'}`][type]['10'].weight = value;

        }
        else {
          currentSession[`${isPlan ? 'plan' : 'actual'}`][type][level].weight = value;

        }
        workingData[sessionId] = currentSession;
        saveWorkingData(workingData);
        refreshWorkingData();
      }
      console.log('updateIntensityWeight', value);

    };
    const WeightSelect = ({value, level, onSelectWeight}) => {
      return (
        <select value={value} onChange={(event) => onSelectWeight(event.target.value, level)}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="30">30</option>
        <option value="35">35</option>
        <option value="40">40</option>
        <option value="45">45</option>
        <option value="50">50</option>
        <option value="55">55</option>
        <option value="60">60</option>
        <option value="65">65</option>
        <option value="70">70</option>
        <option value="75">75</option>
        <option value="80">80</option>
        <option value="85">85</option>
        <option value="90">90</option>
        <option value="95">95</option>
        <option value="100">100</option>
        <option value="105">105</option>
        <option value="110">110</option>
        <option value="115">115</option>
        <option value="120">120</option>
        <option value="125">125</option>
        <option value="130">130</option>
        <option value="135">135</option>
        <option value="110">140</option>
        <option value="115">145</option>
        <option value="120">150</option>
        <option value="125">155</option>
        <option value="130">160</option>
        <option value="135">165</option>
        </select>
      );
    };

    let exerciseRows = <div />;
    if (wtf) {
      exerciseRows = exerciseTypeDataKeys.map((key, index) => {
        const isPlan = (mode === 'plan');
        const valObj = (isPlan ? currentSession.plan[type][key] : currentSession.actual[type][key]);

        if (!valObj.weight) {
          valObj.weight = 5;
        }
        return (
          <tr key={valObj.intensity}>
          <td>
            <ExerciseSelect isPlan={isPlan} type={type} value={valObj.exercise} level={valObj.intensity} onSelectExercise={(event) => updateIntensityExercise(event.target.value, valObj.intensity, type, isPlan)} isFirstRow={index === 0} />
          </td>
          <td style={{textAlign: 'center'}}>{reps[valObj.intensity]}</td>
          <td style={{textAlign: 'center'}}>
            <WeightSelect level={valObj.intensity}  isPlan={isPlan} type={type} value={valObj.weight} level={valObj.intensity} onSelectWeight={
              (value) => {
                console.log('||  hello world');
                return updateIntensityWeight(value, valObj.intensity, type, isPlan);
              }
              } />
          </td>
          <td style={{textAlign: 'center'}}>{valObj.intensity}</td>
          </tr>
        )
      });
  
    }
    return (<div style={{padding: '4px 0 4px 0'}}>
      
      <table>
        <caption style={{textAlign: 'left'}}>{type}</caption>
        <thead>
        <tr>
          <th style={{textAlign: 'left'}}>exercise</th>
          <th style={{textAlign: 'center'}}>reps</th>
          <th style={{textAlign: 'center'}}>weight</th>
          <th style={{textAlign: 'center'}}>intensity</th>
        </tr>
        </thead>
        <tbody>
          {exerciseRows}
        </tbody>
      </table>
    </div>);
  };
  






  const addExerciseBlock = (exerciseType) => {
    console.log('addExercise', exerciseType);
    if (!currentSession.plan) {
      currentSession.plan = {};
    };
    if (!currentSession.actual) {
      currentSession.actual = {};
    };

    if (!currentSession.plan[exerciseType]) {
      currentSession.plan[exerciseType] = {
        5: {
          intensity: 5,
          exercise: getDefaultExercise(exerciseType),
        },
        6: {
          intensity: 6,
          exercise: getDefaultExercise(exerciseType),
        },
        7: {
          intensity: 7,
          exercise: getDefaultExercise(exerciseType),
        },
        8: {
          intensity: 8,
          exercise: getDefaultExercise(exerciseType),
        },
        9: {
          intensity: 9,
          exercise: getDefaultExercise(exerciseType),
        },
        10: {
          intensity: 10,
          exercise: getDefaultExercise(exerciseType),
        }
      }
    }
    if (!currentSession.actual[exerciseType]) {
      currentSession.actual[exerciseType] = {
        5: {
          intensity: 5,
          exercise: getDefaultExercise(exerciseType),
        },
        6: {
          intensity: 6,
          exercise: getDefaultExercise(exerciseType),
        },
        7: {
          intensity: 7,
          exercise: getDefaultExercise(exerciseType),
        },
        8: {
          intensity: 8,
          exercise: getDefaultExercise(exerciseType),
        },
        9: {
          intensity: 9,
          exercise: getDefaultExercise(exerciseType),
        },
        10: {
          intensity: 10,
          exercise: getDefaultExercise(exerciseType),
        }
      }
    }
    workingData[sessionId] = currentSession;
    saveWorkingData(workingData);
    refreshWorkingData();

  };


  // const BackBlock = () => {return (
  //   if (currentSession.plan['back']) {

  //     }
  //   )
  // };

  const planElCollection = [];
  const actualElCollection = [];

  if (currentSession && currentSession.plan) {
    if (currentSession.plan['back']) {
      planElCollection.push(<ExerciseBlock type={'back'} mode={'plan'} session={currentSession} />);
      actualElCollection.push(<ExerciseBlock type={'back'} mode={'actual'} session={currentSession} />);
    }
    if (currentSession.plan['biceps']) {
      planElCollection.push(<ExerciseBlock type={'biceps'} mode={'plan'} session={currentSession} />);
      actualElCollection.push(<ExerciseBlock type={'biceps'} mode={'actual'} session={currentSession} />);

    }
    if (currentSession.plan['chest']) {
      planElCollection.push(<ExerciseBlock type={'chest'} mode={'plan'} session={currentSession} />);
      actualElCollection.push(<ExerciseBlock type={'chest'} mode={'actual'} session={currentSession} />);

    }
    if (currentSession.plan['shoulders']) {
      planElCollection.push(<ExerciseBlock type={'shoulders'} mode={'plan'} session={currentSession} />);
      actualElCollection.push(<ExerciseBlock type={'shoulders'} mode={'actual'} session={currentSession} />);

    }
    if (currentSession.plan['triceps']) {
      planElCollection.push(<ExerciseBlock type={'triceps'} mode={'plan'} session={currentSession} />);
      actualElCollection.push(<ExerciseBlock type={'triceps'} mode={'actual'} session={currentSession} />);

    }
    if (currentSession.plan['quads']) {
      planElCollection.push(<ExerciseBlock type={'quads'} mode={'plan'} session={currentSession} />);
      actualElCollection.push(<ExerciseBlock type={'quads'} mode={'actual'} session={currentSession} />);

    }

  }

  const exerciseBlocks = (
      <div>
        {currentSession && currentSession.plan && !currentSession.plan['back'] && <button className={'add-exercise'} onClick={() => addExerciseBlock('back')}>back</button>}
        {currentSession && currentSession.plan && !currentSession.plan['biceps'] && <button className={'add-exercise'} onClick={() => addExerciseBlock('biceps')}>biceps</button>}
        {currentSession && currentSession.plan && !currentSession.plan['chest'] && <button className={'add-exercise'} onClick={() => addExerciseBlock('chest')}>chest</button>}
        {currentSession && currentSession.plan && !currentSession.plan['shoulders'] && <button className={'add-exercise'} onClick={() => addExerciseBlock('shoulders')}>shoulders</button>}
        {currentSession && currentSession.plan && !currentSession.plan['triceps'] && <button className={'add-exercise'} onClick={() => addExerciseBlock('triceps')}>triceps</button>}
        {currentSession && currentSession.plan && !currentSession.plan['quads'] && <button className={'add-exercise'} onClick={() => addExerciseBlock('quads')}>quads</button>}
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <div>
            <h3>Plan</h3>
            {planElCollection}
          </div>
          <div>
            <h3>Actual</h3>
            {actualElCollection}
          </div>
        </div>
      </div>
  );

  const rawDataKeys = Object.keys(workingData);
  rawDataKeys.reverse();
  const rawDataDisplay = rawDataKeys.map((key) => {
    return (
      <div key={key}>
        <hr />
        <div>
          <button value={key} onClick={loadSession}>{getFriendlyDateString(key)}</button>
        </div>
        {/* {JSON.stringify(workingData[key], null, 4)} */}
      </div>
      )
  });


  return (
    <div className="App">
      <header className="App-header">
        <h1>Exercise Log</h1>
        {isShowCalendar && <Calendar value={selectedDate} onChange={onDateSelect} />}
        {!isShowCalendar && <button style={{background: 'transparent', border: '0', color: 'darkblue', cursor: 'pointer'}} onClick={showCalendar}>calendar</button>}
        {sessionId && <div>session: {getFriendlyDateString(sessionId)}</div>}
        {/* {!sessionId && <button onClick={startSession}>start new session</button>}
        {sessionId && <button onClick={endSession}>end session</button>} */}
      </header>
      <div style={{padding:'0 3rem 0 3rem'}}>
        {sessionId && <div style={{padding: '2rem', maxWidth: '900px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignContent: 'center'}}>{exerciseBlocks}</div>}
        <div>
          <div>history {rawDataKeys && rawDataKeys.length}</div>
          {rawDataDisplay}
        </div>
      </div>
    </div>
  );
};

export default App;
