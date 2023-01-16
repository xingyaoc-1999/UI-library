import React, { ReactNode } from "react";

interface ControlledOnboardingFlowProps {
  children: ReactNode;
  onFinish: Function;
  currentIndex: number;
  onNext: (params: object) => void;
}
export const ControlledOnboardingFlow = ({
  children,
  currentIndex,
  onNext,
}: ControlledOnboardingFlowProps) => {
  const currentChild = React.Children.toArray(children)[currentIndex];

  const goToNext = (stepData: object) => {
    onNext(stepData);
  };

  if (React.isValidElement(currentChild)) {
    return React.cloneElement(currentChild, { goToNext } as any);
  }

  return currentChild;
};
