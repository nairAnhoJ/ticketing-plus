export interface Counts {
  all: number;
  pending: number;
  in_progress: number;
  needs_feedback: number;
  closed: number;
}

export interface TicketUpdates {
    id: number;
    message: string;
    user_id: number;
    created_by: string;
    created_at: string;
}

export interface Ticket {
  id: number;
  ticket_number: string;
  category: string;
  sla_hours: number;
  subject: string;
  description: string;
  status: "pending" | "in_progress" | "needs_feedback" | "closed";
  requester: string;
  department: string;
  created_at: string;
  assigned_to: string;
  started_at: string;
  started_by: string;
  completed_at: string;
  completed_by: string;
  on_hold_duration: string;
  rating: number | null;
}

export interface SelectedTicket { 
  id: number;
  ticket_number: string;
  ticket_category: string;
  subject: string;
  description: string;
  status: "pending" | "in_progress" | "needs_feedback" | "closed";
  requester: string;
  requester_department: string;
  requested_at: string;
  assigned_to: string;
  assigned_user: string;
  created_at: string;
  started_at: string;
  resolution: string;
  completed_by: string;
  completed_at: string;
  on_hold_duration: string;
  updates: TicketUpdates[] | null;
  rating: number | null;
  requester_feedback: string;
  feedback_submitted_at: string;
}

export type Status = "all" | "pending" | "in_progress" | "needs_feedback" | "closed";

export interface Option {
  id: string;
  name: string;
}