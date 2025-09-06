export const COMPETENCE_LEVELS = {
  BE: {
    label: 'Below Expectation',
    color: '#FF6B6B',
    description: 'Needs significant support'
  },
  AE: {
    label: 'Approaching Expectation',
    color: '#FFD93D',
    description: 'Developing with some support needed'
  },
  ME: {
    label: 'Meeting Expectation',
    color: '#6BCF7F',
    description: 'Consistently meets standards'
  },
  EE: {
    label: 'Exceeding Expectation',
    color: '#1C91FC',
    description: 'Advanced mastery achieved'
  }
};

export const LEARNING_STRANDS = [
  'Letter Identification',
  'Letter Naming',
  'Letter Formation',
  'Phonemic Awareness'
];

export const STRAND_KEYS = {
  'Letter Identification': 'letterIdentification',
  'Letter Naming': 'letterNaming',
  'Letter Formation': 'letterFormation',
  'Phonemic Awareness': 'phonemicAwareness'
};

export const API_ENDPOINTS = {
  CLASS_PROFILE: '/class_profile',
  STUDENTS: '/students'
};

export const API_BASE_URL = 'http://localhost:3000';
