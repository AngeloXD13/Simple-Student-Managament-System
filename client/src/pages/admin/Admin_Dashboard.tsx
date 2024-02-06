import React, { useEffect, useRef, useState } from "react";
import logo from "../../logo.svg";
import "../../App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";

import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import { Menubar } from "primereact/menubar";

import { Badge } from "primereact/badge";
import { MenuItem } from "primereact/menuitem";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import axiosInstance from "../../axiosConfig";

import { response } from "express";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column, ColumnBodyOptions } from "primereact/column";

interface Course {
  name: string;
  coursecode: string;
}

interface Year {
  name: string;
  value: string;
}

interface Student {
  _id: string;
  fname: string;
  mname: string;
  lname: string;
  contact: string;
  address: string;
  birthdate?: string;
  course: {
    name: string;
    coursecode: string;
  };
  year: number;
}

// interface Course {
//   name: string;
//   coursecode: string;
// }

function Admin_Dashboard() {
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showEditStudent, setShowEditStudent] = useState(false);
  const [showViewStudent, setShowViewStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editingStudentId, setEditingStudentId] = useState<string>("");
  // const [value, setValue] = useState<string>("");
  // const [date, setDate] = useState<Date | null>(null);
  // const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [fname, setFname] = useState<string>("");
  const [mname, setMname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [birthdate, setBirthdate] = useState<Date>();
  const [course, setCourse] = useState<Course>();
  const [year, setYear] = useState<string>();

  const [students, setStudents] = useState<Student[]>([]);

  const courses: Course[] = [
    { name: "BSIT", coursecode: "BSIT" },
    { name: "BSCHEM", coursecode: "BSCHEM" },
    { name: "BSME", coursecode: "BSME" },
  ];

  const studentyear: Year[] = [
    { name: "1st Year", value: "1" },
    { name: "2nd Year", value: "2" },
    { name: "3rd Year", value: "3" },
    { name: "4th Year", value: "4" },
    { name: "5th Year", value: "4" },
  ];

  const items: MenuItem[] = [
    {
      label: "Dashboard",
      icon: "pi pi-home",
    },
    {
      label: "Students",
      icon: "pi pi-star",
    },
  ];

  const start = (
    <>
      <h3>Admin Dashboard</h3>
      {/* <img
        alt="logo"
        src="https://primefaces.org/cdn/primereact/images/logo.png"
        height="40"
        className="mr-2"
      ></img> */}
    </>
  );

  const end = (
    <div className="flex align-items-center gap-2">
      {/* <InputText
        placeholder="Search"
        type="text"
        className="w-8rem sm:w-auto"
      /> */}
      {/* <Avatar
        image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
        shape="circle"
      /> */}
      <Link to={`/`}>
        <Button label="Logout" />
      </Link>
    </div>
  );

  const toast = useRef<Toast>(null);
  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      life: 3000,
    });
  };

  const submitStudent = () => {
    axiosInstance
      .post("api/students", {
        fname,
        mname,
        lname,
        contact,
        address,
        birthdate,
        course,
        year,
      })
      .then((response) => {
        console.log("axios error", response.data);
        const { success, msg } = response.data;
        if (success) {
          showSuccess();
          setShowAddStudent(false);
          fetchStudents();
          clearvalues();
        }
      })
      .catch((error) => {
        console.error("axios error", error);
      });
  };

  const viewEditStudent = (rowData: Student) => {
    setFname(rowData.fname);
    setMname(rowData.mname);
    setLname(rowData.lname);
    setContact(rowData.contact);
    setAddress(rowData.address);
    setBirthdate(new Date(rowData.birthdate || ""));
    setCourse(rowData.course); // Assuming course is an object with name property
    setYear(rowData.year.toString());

    setEditingStudentId(rowData._id);
    setSelectedStudent(rowData);
    setShowEditStudent(true);
  };

  const editStudent = (id: string) => {
    axiosInstance
      .put(`api/students/${id}`, {
        fname,
        mname,
        lname,
        contact,
        address,
        birthdate,
        course,
        year,
      })
      .then((response) => {
        console.log("axios error", response.data);
        const { success, msg } = response.data;
        if (success) {
          showSuccess();
          setShowEditStudent(false);
          fetchStudents();
          clearvalues();
        }
      })
      .catch((error) => {
        console.error("axios error", error);
      });
  };

  const fetchStudents = () => {
    axiosInstance
      .get<Student[]>("api/students/")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("axios error", error);
      });
  };

  const deleteStudent = (id: string) => {
    axiosInstance
      .delete(`api/students/${id}`)
      .then((response) => {
        console.log("axios error", response.data);
        const { success, msg } = response.data;
        if (success) {
          showSuccess();
          setShowAddStudent(false);
          fetchStudents();
        }
      })
      .catch((error) => {
        console.error("axios error", error);
      });
  };

  const viewStudent = (rowData: Student) => {
    setSelectedStudent(rowData);
    setShowViewStudent(true);
  };

  const actionbutton = (rowData: Student, options: ColumnBodyOptions) => {
    return (
      <>
        <span className="ml-2">
          <Button
            label="View"
            severity="info"
            onClick={() => viewStudent(rowData)}
          />
        </span>
        <span className="ml-2">
          <Button
            label="Edit"
            severity="warning"
            onClick={() => viewEditStudent(rowData)}
          />
        </span>
        <span className="ml-2">
          <Button
            label="Delete"
            severity="danger"
            onClick={() => deleteStudent(rowData._id)}
          />
        </span>
      </>
    );
  };

  const clearvalues = () => {
    setFname("");
    setMname("");
    setLname("");
    setContact("");
    setAddress("");
    setBirthdate(undefined);
    setCourse(undefined); // Assuming course is an object with name property
    setYear("");

    setEditingStudentId("");
    setSelectedStudent(null);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="card">
      <Toast ref={toast} />
      <Menubar model={items} start={start} end={end} />
      <br />
      <Button
        className="m-2 right-3"
        label="Add Students"
        onClick={() => setShowAddStudent(true)}
      />

      <Dialog
        header="Add Student"
        visible={showAddStudent}
        style={{ width: "auto" }}
        onHide={() => setShowAddStudent(false)}
      >
        <br />
        <br />
        <span className="p-float-label">
          <InputText
            id="fname"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
          <label htmlFor="fname">First Name</label>
        </span>
        <br />
        <br />
        <span className="p-float-label">
          <InputText
            id="mname"
            value={mname}
            onChange={(e) => setMname(e.target.value)}
          />
          <label htmlFor="mname">Middle Name</label>
        </span>
        <br />
        <br />
        <span className="p-float-label">
          <InputText
            id="lname"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
          <label htmlFor="lname">Last Name</label>
        </span>
        <br />
        <br />

        <span className="p-float-label">
          <InputMask
            id="phone"
            mask="9999-999-9999"
            placeholder="09xx-xxx-xxxx"
            value={contact || ""}
            onChange={(e: InputMaskChangeEvent) => {
              if (e.value !== null && e.value !== undefined) {
                setContact(e.value);
              }
            }}
          ></InputMask>
          <label htmlFor="address">Contact Number</label>
        </span>

        <br />
        <br />
        <span className="p-float-label">
          <InputText
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label htmlFor="address">Address</label>
        </span>

        <br />

        <br />
        <span className="p-float-label">
          <Calendar
            inputId="birth_date"
            value={birthdate}
            onChange={(e) => {
              if (e.value !== null && e.value !== undefined) {
                setBirthdate(e.value);
              }
            }}
          />
          <label htmlFor="birth_date">Birth Date</label>
        </span>
        <br />
        <br />
        <Dropdown
          value={course}
          onChange={(e: DropdownChangeEvent) => setCourse(e.value)}
          options={courses}
          optionLabel="name"
          placeholder="Select a Course"
          className="w-full md:w-14rem"
        />
        <br />
        <br />
        <br />
        <Dropdown
          value={year}
          onChange={(e: DropdownChangeEvent) => setYear(e.value)}
          options={studentyear}
          optionLabel="name"
          placeholder="Select Year"
          className="w-full md:w-14rem"
        />
        <br />
        <br />

        <center className="card flex justify-content-center">
          <Button label="Add Submit" onClick={() => submitStudent()} />
        </center>
      </Dialog>

      <Dialog
        header="View Student Info"
        visible={showViewStudent}
        style={{ width: "auto" }}
        onHide={() => setShowViewStudent(false)}
      >
        {selectedStudent && (
          <>
            <p>
              <strong>First Name:</strong> {selectedStudent.fname}
            </p>
            <p>
              <strong>Middle Name:</strong> {selectedStudent.mname}
            </p>
            <p>
              <strong>Last Name:</strong> {selectedStudent.lname}
            </p>
            <p>
              <strong>Contact:</strong> {selectedStudent.contact}
            </p>
            <p>
              <strong>Address:</strong> {selectedStudent.address}
            </p>
            <p>
              <strong>Birthday:</strong>{" "}
              {selectedStudent.birthdate
                ? new Date(selectedStudent.birthdate).toLocaleDateString(
                    undefined,
                    { year: "numeric", month: "long", day: "numeric" }
                  )
                : "N/A"}
            </p>
            <p>
              <strong>Course:</strong>{" "}
              {`${selectedStudent.course.name} (${selectedStudent.course.coursecode})`}
            </p>
            <p>
              <strong>Year:</strong>{" "}
              {selectedStudent.year != null
                ? selectedStudent.year >= 11 && selectedStudent.year <= 13
                  ? `${selectedStudent.year}th`
                  : `${selectedStudent.year}${
                      [, "st", "nd", "rd"][selectedStudent.year % 10] || "th"
                    }`
                : "N/A"}
            </p>
            {/* Add other properties as needed */}
          </>
        )}
      </Dialog>

      <Dialog
        header="Edit Student"
        visible={showEditStudent}
        style={{ width: "auto" }}
        onHide={() => setShowEditStudent(false)}
      >
        <br />
        <br />
        <span className="p-float-label">
          <InputText
            id="fname"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
          <label htmlFor="fname">First Name</label>
        </span>
        <br />
        <br />
        <span className="p-float-label">
          <InputText
            id="mname"
            value={mname}
            onChange={(e) => setMname(e.target.value)}
          />
          <label htmlFor="mname">Middle Name</label>
        </span>
        <br />
        <br />
        <span className="p-float-label">
          <InputText
            id="lname"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
          <label htmlFor="lname">Last Name</label>
        </span>
        <br />
        <br />

        <span className="p-float-label">
          <InputMask
            id="phone"
            mask="9999-999-9999"
            placeholder="09xx-xxx-xxxx"
            value={contact || ""}
            onChange={(e: InputMaskChangeEvent) => {
              if (e.value !== null && e.value !== undefined) {
                setContact(e.value);
              }
            }}
          ></InputMask>
          <label htmlFor="address">Contact Number</label>
        </span>

        <br />
        <br />
        <span className="p-float-label">
          <InputText
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label htmlFor="address">Address</label>
        </span>

        <br />

        <br />
        <span className="p-float-label">
          <Calendar
            inputId="birth_date"
            value={birthdate}
            onChange={(e) => {
              if (e.value !== null && e.value !== undefined) {
                setBirthdate(e.value);
              }
            }}
          />
          <label htmlFor="birth_date">Birth Date</label>
        </span>
        <br />
        <br />
        <Dropdown
          value={course}
          onChange={(e: DropdownChangeEvent) => setCourse(e.value)}
          options={courses}
          optionLabel="name"
          placeholder="Select a Course"
          className="w-full md:w-14rem"
        />
        <br />
        <br />
        <br />
        <Dropdown
          value={year}
          onChange={(e: DropdownChangeEvent) => setYear(e.value)}
          options={studentyear}
          optionLabel="name"
          placeholder="Select Year"
          className="w-full md:w-14rem"
        />
        <br />
        <br />

        <center className="card flex justify-content-center">
          <Button
            label="Update Student"
            onClick={() => editStudent(editingStudentId)}
          />
        </center>
      </Dialog>

      <DataTable
        className="m-3"
        value={students}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="fname" header="First Name"></Column>
        <Column field="lname" header="Last Name"></Column>
        <Column
          field="course"
          header="Course"
          body={(rowData) =>
            `${rowData.course.name} (${rowData.course.coursecode})`
          }
        ></Column>
        <Column header="Action" body={actionbutton}></Column>
      </DataTable>
    </div>
  );
}

export default Admin_Dashboard;
