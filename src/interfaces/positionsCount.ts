export interface PositionCountResponseInterface {
  success: boolean;
  message: string;
  data: {
    openPositions: number;
    closedPositions: number;
  };
}
