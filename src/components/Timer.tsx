'use client';

import React from 'react';
import Countdown from 'react-countdown';

interface RendererProps {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
  days: number;
}
const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: RendererProps) => {
  if (completed) {
    // Render a completed state
    return;
  } else {
    // Render a countdown
    return (
      <div className=" text-md md:text-xl text-center text-gray-400 flex max-w-md md:max-w-3xl mx-auto justify-between">
        <div className="text-center">
          <p className="text-4xl md:text-9xl tabular-nums  text-gray-100">
            {days.toString().padStart(2, '0')}
          </p>
          <p>days</p>
        </div>
        <div className="text-center">
          <p className="text-4xl md:text-9xl tabular-nums  text-gray-100">
            {hours.toString().padStart(2, '0')}
          </p>
          <p>hours</p>
        </div>
        <div className="text-center">
          <p className="text-4xl md:text-9xl tabular-nums  text-gray-100">
            {minutes.toString().padStart(2, '0')}
          </p>
          <p>minutes</p>
        </div>
        <div className="text-center">
          <p className="text-4xl md:text-9xl tabular-nums  text-gray-100">
            {seconds.toString().padStart(2, '0')}
          </p>
          <p>seconds</p>
        </div>
      </div>
    );
  }
};
export default function Timer() {
  return (
    <div className=" text-center">
      <Countdown date={new Date(1700697600 * 1000)} renderer={renderer} />
    </div>
  );
}
