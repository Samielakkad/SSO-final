// Sovereign School OS - Type Definitions

// =================================================================
// 1. CORE MODELS
// Foundational types for users and profiles within the system.
// =================================================================

export type Role = 'Teacher' | 'Admin' | 'Student' | 'Parent';

export interface Student {
  id: string;
  name: string;
  status: StudentStatus;
  avatarUrl?: string;
  gradeLevel: number;
}

export interface StudentProfile extends Student {
    incidents: Incident[];
    iepGoals: IEPGoal[];
    points: number;
    focusStreak: number;
    readingStreak: number;
    attendancePercentage: number;
    quests: Quest[];
    reflections: Reflection[];
    assignments: Assignment[];
    quizAttempts: StudentQuizAttempt[];
    learningPath: LearningRecommendation[];
    adventureModuleIds: string[];
    adventureHistory: AdventureHistoryEntry[];
    selectedHero: string;
    pronouns: string;
    interests: string[];
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  classId: string;
}

export interface Parent {
  id: string;
  name: string;
  studentId: string;
  studentName: string;
  preferredLanguage: string; // e.g., 'en', 'es'
  avatarUrl?: string;
}

// =================================================================
// 2. STUDENT-FACING & ENGAGEMENT MODELS
// Types related to the student's direct experience and activities.
// =================================================================

export type StudentStatus = 'focused' | 'distracted' | 'needs_help' | 'absent';

export type QuestStatus = 'active' | 'completed' | 'pending_review';

export interface Quest {
    id:string;
    title: string;
    description: string;
    points: number;
    status: QuestStatus;
    completedAt?: string;
    requiresProof?: boolean;
    proof?: {
        type: 'text';
        content: string;
    };
}

export interface Reflection {
    id: string;
    date: string;
    mood: 'great' | 'good' | 'okay' | 'bad';
    comment: string;
}

export interface AssignmentSubmission {
    type: 'text' | 'file';
    content: string; // text content or base64 data for file
    fileName?: string;
    submittedDate: string;
}

export interface Assignment {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    topic: string;
    pdfUrl?: string; // For teacher-uploaded PDF
    pdfName?: string;
    assignedDate: string;
    teacherId: string;
    status: 'pending' | 'submitted' | 'completed';
    submission?: AssignmentSubmission;
    rubric?: {
        criteria: {
            criterion: string;
            description: string;
        }[];
    };
    sourceText?: string;
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    topic: string;
}

export interface Quiz {
    id: string;
    title: string;
    topic: string;
    questions: QuizQuestion[];
    sourceText?: string;
}

export interface StudentQuizAttempt {
    id: string;
    quizId: string;
    quizTitle: string;
    studentId: string;
    timestamp: string;
    score: number; // Percentage
    answers: { questionId: string; studentAnswer: string; isCorrect: boolean }[];
}

export interface LearningRecommendation {
    type: 'lesson' | 'practice';
    topic: string;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
}

// =================================================================
// ADVENTURE & INTERACTIVE LEARNING MODELS (REVISED)
// =================================================================

export type InteractionType = 'CHOICE' | 'FILL_IN_THE_BLANK' | 'MATCHING' | 'FIND_THE_MISTAKE' | 'ORDERING' | 'CATEGORIZATION';

export interface AdventureChoice {
    text: string;
    isCorrect: boolean;
    feedback: string;
}

export interface InteractionChoicePayload {
    type: 'CHOICE';
    choices: AdventureChoice[];
}

export interface InteractionFillBlankPayload {
    type: 'FILL_IN_THE_BLANK';
    // The sentence with a placeholder like: "The process plants use to make food is called {photosynthesis}."
    sentenceWithAnswer: string;
    // Optional array of choices for the blank. First item should be the correct answer.
    wordBank?: string[];
    feedback: string; // General feedback after correct answer
}

export interface MatchingPair {
    term: string;
    definition: string;
}

export interface InteractionMatchingPayload {
    type: 'MATCHING';
    instruction: string;
    pairs: MatchingPair[];
    feedback: string; // General feedback after correct answer
}

export interface InteractionFindMistakePayload {
    type: 'FIND_THE_MISTAKE';
    // The incorrect statement, e.g., "The sun revolves around the Earth."
    statement: string;
    // The correct version, e.g., "The Earth revolves around the Sun."
    correction: string;
    feedback: string; // Feedback explaining the mistake
}

export interface InteractionOrderingPayload {
    type: 'ORDERING';
    instruction: string;
    // The items are provided in the correct order. The UI should shuffle them.
    orderingItems: string[];
    feedback: string; // General feedback after correct answer
}

export interface CategorizationItem {
    item: string;
    category: string;
}

export interface InteractionCategorizationPayload {
    type: 'CATEGORIZATION';
    instruction: string;
    categories: string[];
    categorizationItems: CategorizationItem[];
    feedback: string;
}


export type AdventureInteraction =
  | InteractionChoicePayload
  | InteractionFillBlankPayload
  | InteractionMatchingPayload
  | InteractionFindMistakePayload
  | InteractionOrderingPayload
  | InteractionCategorizationPayload;

export interface AdventureNode {
    stage: number;
    sceneDescription: string;
    sceneVisualPrompt: string;
    interaction: AdventureInteraction;
}

export interface InteractiveAdventure {
    title: string;
    nodes: AdventureNode[];
}

export interface AdventureHistoryEntry {
    moduleId: string;
    title: string;
    completedAt: string;
    score: number; // Percentage
}


// =================================================================
// 3. TEACHER-FACING & CLASSROOM MANAGEMENT MODELS
// Types primarily used by teachers for managing their class.
// =================================================================

export type IncidentSeverity = 'low' | 'medium' | 'high';

export type IncidentType = 'Disruption' | 'Off-task' | 'Positive Behavior' | 'Conflict' | 'Safety Concern';

export interface Incident {
  id: string;
  studentId: string;
  studentName: string; // Keep for display purposes
  timestamp: string;
  incidentType: IncidentType;
  summary: string;
  severity: IncidentSeverity;
  isResolved?: boolean;
}

export interface IEPGoal {
    id: string;
    studentId: string;
    goal: string;
    focusArea: string;
    dateCreated: string;
    status: 'pending_approval' | 'active' | 'achieved' | 'archived';
}

export interface LessonPlanActivity {
    duration: number; // in minutes
    activity: string; // title of activity
    description: string;
    imagePrompt: string | null; // Special prompt for an image to be generated
}

export interface LessonPlan {
    title: string;
    topic: string;
    learningObjectives: string[];
    keyVocabulary: string[];
    materials: string[];
    lessonActivities: LessonPlanActivity[];
    assessment: {
        method: string;
        description: string;
    };
    differentiation: {
        support: string;
        challenge: string;
    };
    sourceText?: string;
}

export interface AdventureModule {
  id: string;
  topic: string;
  prompt: string;
  sourceText?: string;
  ageGroup: string;
  stages: number;
  learningObjectives: string[];
  finalAssessmentQuestion: {
      question: string;
      answer: string;
  };
  teacherId?: string;
  teacherName?: string;
}

export interface WeeklyProgressReport {
    studentId: string;
    weekOf: string; // e.g., '2024-09-23'
    summary: string; // AI-generated summary
    quizAverage: number | null;
    assignmentsCompleted: number;
    incidentsLogged: number;
}

export interface Priority {
    id: string;
    text: string;
    isCompleted: boolean;
}


// =================================================================
// 4. COMMUNICATION MODELS
// Types for parent-teacher and school-wide communications.
// =================================================================

export type CommunicationTopic = 'positive_update' | 'missing_assignment' | 'behavior_concern' | 'upcoming_test' | 'general_question' | 'scheduling_request';

export const communicationTopicLabels: Record<CommunicationTopic, string> = {
    positive_update: 'Positive Update',
    missing_assignment: 'Missing Assignment',
    behavior_concern: 'Behavior Concern',
    upcoming_test: 'Upcoming Test/Quiz',
    general_question: 'General Question',
    scheduling_request: 'Scheduling Request',
};

export interface Message {
  id: string;
  sender: 'teacher' | 'parent';
  text: string;
  timestamp: string;
  translatedText?: string; // For AI translation
}

export interface Conversation {
  id: string;
  parentId: string;
  parentName: string;
  studentId: string;
  studentName: string;
  subject: string;
  messages: Message[];
  lastMessageTimestamp: string;
  isRead: boolean;
}

export interface Announcement {
    id: string;
    title: string;
    content: string;
    author: string;
    timestamp: string;
    audience: 'staff' | 'all';
}


// =================================================================
// 5. ADMINISTRATOR-FACING MODELS
// Types specific to the administrative portal.
// =================================================================

export interface ComplianceLogEntry {
    id: string;
    timestamp: string;
    user: string; // e.g., 'Admin Portal', 'Ms. Peterson'
    action: string; // e.g., 'Viewed Student Record', 'Generated Fairness Report'
    details: string;
    approvedBy?: string;
}

export interface SupportRecommendation {
    studentId: string;
    studentName: string;
    reason: string; // AI-generated reason for concern
    suggestedAction: string; // AI-generated suggested action
    keyMetrics: {
        incidents: number;
        avgScore: number | null;
        attendance: number;
    };
}

export type ApprovalRequestType = 'HIGH_SEVERITY_INCIDENT' | 'IEP_GOAL';

export interface ApprovalRequest {
    id: string;
    requesterId: string;
    requesterName: string;
    studentId: string;
    studentName: string;
    type: ApprovalRequestType;
    relatedId: string; // ID of the incident or IEP Goal
    details: string;
    status: 'pending' | 'approved' | 'denied';
    timestamp: string;
    approverComment?: string;
    resolvedAt?: string;
    resolvedBy?: string;
}


// =================================================================
// 6. AI SERVICE & API MODELS
// Types used for making requests to the Gemini service.
// =================================================================

export interface IEPGoalRequest {
    student: StudentProfile;
}

export interface ParentCommunicationRequest {
    studentId: string;
    topic: CommunicationTopic; // Using the more general type for consistency
}

export interface LessonPlanRequest {
    sourceText: string;
    topic: string;
    ageGroup: string;
    skillLevel: string;
    culturalNotes: string;
}

export interface ChatMessage {
    role: "user" | "model";
    parts: { text: string }[];
}

export interface ChatConversation {
    id: string; // e.g., 'student-s1-astra-1678886400000'
    contextId: string; // e.g., 'student-s1-astra'
    title: string; // First user message or AI-generated title
    messages: ChatMessage[];
    timestamp: string; // ISO string of last message
}

export interface SmartSuggestion {
    type: 'academic' | 'individual';
    studentName?: string;
    suggestion: string;
}

export type ParsedContent =
    | { type: 'text'; value: string }
    | { type: 'fill_in_blank'; before: string; after: string; answer: string; wordBank?: string[]; id: string }
    | { type: 'mcq'; question: string; options: string[]; answer: string; id:string }
    | { type: 'matching'; instruction: string; pairs: { term: string, definition: string }[]; id: string }
    | { type: 'ordering'; instruction: string; orderingItems: string[]; id: string }
    | { type: 'find_the_mistake'; statement: string; mistake: string; correction: string; id: string }
    | { type: 'categorization'; instruction: string; categories: string[]; categorizationItems: { item: string, category: string }[]; id: string };


// =================================================================
// 7. PLATFORM-WIDE MODELS
// Types used across multiple portals, like Calendar and Archive.
// =================================================================

export interface CalendarEvent {
  id: string;
  title: string;
  start: string; // ISO string for date
  end?: string; // ISO string for date (optional for single-day events)
  type: 'holiday' | 'assignment' | 'quiz' | 'class_period' | 'event';
  description?: string;
  allDay: boolean;
}

export type ArchivedContentType = 'LessonPlan' | 'AdventureModule' | 'Quiz' | 'CourseSummary' | 'StudentWork' | 'AdminReport';

export interface ArchivedItem {
  id: string;
  timestamp: string;
  type: ArchivedContentType;
  title: string;
  topic?: string;
  authorId?: string;
  studentId?: string;
  content: any;
}
