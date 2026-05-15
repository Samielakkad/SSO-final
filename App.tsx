import React, { useState } from 'react';
import TeacherPortal from './components/teacher/TeacherPortal.tsx';
import StudentPortal from './components/student/StudentPortal.tsx';
import AdministrationPortal from './components/administration/AdministrationPortal.tsx';
import Button from './components/common/Button.tsx';
import Chatbot from './components/common/Chatbot.tsx';
import Input from './components/common/Input.tsx';
import { GraduationCapIcon, UserIcon } from './components/icons/StudentIcons.tsx';
import { ShieldAlertIcon, EyeIcon, EyeOffIcon } from './components/icons/SettingsIcon.tsx';
import * as studentDataService from './services/studentDataService.ts';

type Role = 'teacher' | 'student' | 'administration';
type NullableRole = Role | null;

const App: React.FC = () => {
  const [role, setRole] = useState<NullableRole>(null);

  const [loginRole, setLoginRole] = useState<Role>('teacher');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const getMockUsers = () => {
    const teachers = studentDataService.getTeachers();
    // For demo purposes, we'll just use the first teacher and a generic student/admin login.
    return {
      teacher: { email: teachers[0]?.email || 'teacher@school.edu', password: 'password' },
      student: { email: 'student@school.edu', password: 'password' },
      administration: { email: 'admin@school.edu', password: 'password' },
    };
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const mockUsers = getMockUsers();
    const expectedUser = mockUsers[loginRole];

    if (email.toLowerCase() === expectedUser.email && password === expectedUser.password) {
      setRole(loginRole);
    } else {
      setError('Invalid email or password for the selected role.');
    }
  };

  const RoleButton: React.FC<{
    roleName: Role;
    label: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
  }> = ({ roleName, label, icon: Icon }) => (
    <button
      type="button"
      onClick={() => setLoginRole(roleName)}
      className={`flex-1 p-3 rounded-md flex flex-col items-center justify-center transition-colors duration-200 ${
        loginRole === roleName
          ? 'bg-indigo-600 text-white shadow-lg'
          : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
      }`}
    >
      <Icon className="w-6 h-6 mb-1" />
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
  
  const MOCK_USERS = getMockUsers();

  if (!role) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="p-8 bg-gray-800 rounded-lg shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Sovereign School OS</h1>
              <p className="text-indigo-300">Please sign in to your portal</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Select Your Role</label>
                <div className="flex gap-2">
                  <RoleButton roleName="teacher" label="Teacher" icon={GraduationCapIcon} />
                  <RoleButton roleName="student" label="Student" icon={UserIcon} />
                  <RoleButton roleName="administration" label="Admin" icon={ShieldAlertIcon} />
                </div>
              </div>

              <Input
                label="Email"
                type="email"
                placeholder="user@school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                endIcon={showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                onEndIconClick={() => setShowPassword(!showPassword)}
              />
              
              {error && <p className="text-red-400 text-sm text-center" role="alert">{error}</p>}

              <Button type="submit" className="w-full !text-lg !py-3">Sign In</Button>
            </form>
          </div>
        </div>

        <div className="w-full max-w-md mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-center text-white mb-4 border-b border-gray-700 pb-3">Demo Credentials</h3>
            <div className="space-y-2 text-sm text-center">
                <p className="font-bold text-indigo-300 capitalize text-lg">{loginRole}</p>
                <p className="text-gray-400 font-mono">Email: {MOCK_USERS[loginRole].email}</p>
                <p className="text-gray-400 font-mono">Password: {MOCK_USERS[loginRole].password}</p>
            </div>
          </div>
      </div>
    );
  }

  const handleExit = () => {
    setRole(null);
    setEmail('');
    setPassword('');
    setError('');
  };

  const renderContent = () => {
    switch(role) {
        case 'teacher':
            return <TeacherPortal />;
        case 'student':
            return <StudentPortal onExit={handleExit} />;
        case 'administration':
            return <AdministrationPortal onExit={handleExit} />;
        default:
            return <div>Error: Invalid role selected.</div>;
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {renderContent()}
      <Chatbot />
    </div>
  );
};

export default App;