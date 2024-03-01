// SearchResult.jsx

import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

async function fetchStudentData(filterData) {
  try {
    // Define MongoDB Realm configuration
    const realmConfig = {
      APP_ID: "data-yubip",
      API_KEY: "XvhvZNBWObiDyf651zDE8LsSx59zssBKVMlTHSftn566l7rXoVrbQxnW0L2p6L5A",
      cluster_name: "Cluster0",
      db_name: "student_data",
      collection_name: "student_data"
    };

    // Fetch access token and student data
    const accessToken = await getAccessToken(realmConfig);
    const studentData = await fetchDataFromMongoDB(realmConfig, accessToken, filterData);

    // Process the fetched student data
    console.log("Fetched student data:", studentData);

    return studentData;
  } catch (error) {
    console.error("Error fetching student data:", error);
  }
}

async function getAccessToken(realmConfig) {
  try {
    // Fetch access token using API key
    const response = await fetch(`https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/app/${realmConfig.APP_ID}/auth/providers/api-key/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: realmConfig.API_KEY,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to obtain access token. Status: ${response.status}`);
    }
    const result = await response.json();
    const accessToken = result.access_token;
    if (accessToken === undefined) {
      throw new Error("Access token is undefined");
    }

    return accessToken;
  } catch (error) {
    throw error;
  }
}

async function fetchDataFromMongoDB(realmConfig, accessToken, filterData) {

  console.log('Updated filterSearch:',filterData);
  try {
    // Fetch data from MongoDB using the obtained access token
    const response = await fetch(`https://ap-south-1.aws.data.mongodb-api.com/app/${realmConfig.APP_ID}/endpoint/data/v1/action/find`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        dataSource: realmConfig.cluster_name,
        database: realmConfig.db_name,
        collection: realmConfig.collection_name,
        filter : { 
          d: filterData.d,
          h: filterData.h,
          g: filterData.g,
          b: filterData.b,
          p: filterData.p,
          i: {
          $gte: "230000",
          $lt: "240000"
        },
        $or: [
          {i : filterData.n},
          {n : { $regex: filterData.n}},
          {u : filterData.n},
        ],
      },
        limit: 10000,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data from MongoDB. Status: ${response.status}`);
    }
    const result = await response.json();
    const documents = result.documents;

    if (!Array.isArray(documents)) {
      throw new Error("Student data is undefined");
    }

    return documents;
  } catch (error) {
    throw error;
  }
}

export default function SearchResult({ filterSearch }) {
  const [studentData, setStudentData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchStudentData(filterSearch).then(data => {
      setStudentData(data);
    });
  }, [filterSearch]);
  const handleCardClick = (student) => {
    setSelectedStudent(student);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' , justifyContent:'center' }}>
      {studentData.map((student, index) => (
        <Card
          key={index}
          sx={{ maxWidth: 345, marginBottom: 2, cursor: 'pointer' , width: 400, m:2}}
          onClick={() => handleCardClick(student)}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {student.n}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>RollNo:</strong> {student.i} <br/>
              <strong>Department:</strong> {student.p} {student.d}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>{selectedStudent && selectedStudent.n}</DialogTitle>
        <DialogContent sx={{ padding: 6, borderRadius:4 }}>
          {selectedStudent && (
            <>
              <Typography variant="body2" color="text.secondary">
                <strong>Roll No:</strong> {selectedStudent.i} <br />
                <strong>Room No:</strong> {selectedStudent.r} {selectedStudent.h} <br />
                <strong>Address:</strong> {selectedStudent.a} <br />
                <strong>Department:</strong> {selectedStudent.p} {selectedStudent.d} <br />
                <strong>Blood Group:</strong> {selectedStudent.b} <br />
            </Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
