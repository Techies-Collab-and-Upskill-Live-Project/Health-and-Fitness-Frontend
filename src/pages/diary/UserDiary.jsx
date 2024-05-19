import AppWrapper from "../../components/AppWrapper";
import { CircularProgress } from "../../components/CircularProgressBar";

export default function Diary() {
  return (
    <AppWrapper>
      <CircularProgress progress={30} />
    </AppWrapper>
  );
}
