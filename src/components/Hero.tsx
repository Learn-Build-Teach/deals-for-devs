import React from 'react';

export default function Hero() {
  return (
    <div className="max-w-2xl mx-auto mb-2">
      <div className="mt-24 sm:mt-32 lg:mt-16">
        <a href="#" className="inline-flex space-x-6">
          <span className="rounded-full bg-teal-500/10 px-3 py-1 text-sm font-semibold leading-6 text-teal-400 ring-1 ring-inset ring-teal-500/20">
            Black Friday 2023
          </span>
        </a>
      </div>

      <h1 className="mt-10 text-2xl sm:text-6xl max-w-xl mx-auto text-center w-full font-bold tracking-tight text-white ">
        The Best Deals for{' '}
        <span className="block text-teal-500  text-4xl sm:text-8xl">
          Developers
        </span>
      </h1>
      <p className="mt-2 max-w-xl mx-auto sm:mt-6 text-md sm:text-xl leading-8 tracking-wide text-gray-400 text-center">
        Level up your skills, desk setup, or gadget collection with these Black
        Friday deals.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6"></div>
    </div>
  );
}
