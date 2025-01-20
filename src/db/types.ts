export const TaskType = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;
export type TaskType = (typeof TaskType)[keyof typeof TaskType];
