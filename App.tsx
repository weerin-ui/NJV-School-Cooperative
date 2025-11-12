import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import MainLayout from './components/MainLayout';
import { Transaction, Student } from './types';
import { ADMIN_USERNAME, ADMIN_PASSWORD, INITIAL_STUDENTS } from './constants';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('schoolCoopTransactions');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error reading transactions from localStorage", error);
      return [];
    }
  });

  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem('schoolCoopStudents');
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    } catch (error) {
      console.error("Error reading students from localStorage", error);
      return INITIAL_STUDENTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('schoolCoopTransactions', JSON.stringify(transactions));
    } catch (error) {
      console.error("Error writing transactions to localStorage", error);
    }
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem('schoolCoopStudents', JSON.stringify(students));
    } catch (error) {
      console.error("Error writing students to localStorage", error);
    }
  }, [students]);

  const handleLogin = (username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: new Date().toISOString() + Math.random(),
      date: new Date().toISOString(),
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  const addStudent = (name: string, grade: string) => {
    const newStudent: Student = {
      id: `student-${new Date().getTime()}`,
      name,
      grade
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const deleteStudent = (studentId: string) => {
    setStudents(prev => prev.filter(s => s.id !== studentId));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated ? (
        <MainLayout 
          transactions={transactions} 
          addTransaction={addTransaction} 
          onLogout={handleLogout}
          students={students}
          addStudent={addStudent}
          deleteStudent={deleteStudent}
        />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;