'use client';
import { useHotkeys } from 'react-hotkeys-hook';

import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import Overlay from './Overlay';
import { DealRecord } from '@/xata';
import Link from 'next/link';
import ClickableCouponCode from './ClickableCouponCode';
import MyLink from './MyLink';
import { useSearch } from './SearchContext';
export default function GlobalSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchOpen, setSearchOpen } = useSearch();
  const [timer, setTimer] = useState<null | NodeJS.Timeout>(null);
  const [deals, setDeals] = useState<DealRecord[] | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [searchOpen]);

  const openSearch = () => {
    setSearchOpen(true);
    document.body.style.overflow = 'hidden';
    inputRef?.current?.focus();
  };

  const reset = () => {
    setSearchOpen(false);
    setSearchQuery('');
    setDeals(null);
    document.body.style.overflow = 'unset';
  };

  useHotkeys('esc', reset);

  useHotkeys('/', openSearch, {
    preventDefault: true,
  });

  const handleSearchOnChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(e.target.value);
    if (!e.target.value) {
      setDeals(null);
      return;
    }
    if (timer) {
      clearTimeout(timer);
    }
    setLoading(true);
    setTimer(
      setTimeout(async () => {
        try {
          const res = await fetch(`/api/deals?query=${e.target.value}`);
          if (res.ok) {
            const data = await res.json();
            setDeals(data);
          }
          setLoading(false);
        } catch (error) {}
      }, 500)
    );
  };

  return (
    <>
      <Overlay isOpen={searchOpen} onClose={reset}>
        <p className=" text-gray-100 text-sm mb-2">
          Search powered by{' '}
          <MyLink text="Xata" isFancy={true} href="https://xata.io/" />
        </p>
        <input
          type="text"
          value={searchQuery}
          className="rounded-md w-full p-4 text-lg bg-gray-800 text-gray-100 border-2 border-teal-500 mb-8"
          placeholder="Search Deals"
          onChange={handleSearchOnChange}
          ref={inputRef}
        />

        {loading && (
          <p className="text-gray-100 text-center mt-8 text-xl">Loading...</p>
        )}

        {!loading && !deals && (
          <p className="text-gray-100 text-center mt-8 text-xl">
            Search for amazing developer deals 🔥
          </p>
        )}
        {!loading && deals && deals.length === 0 && (
          <p className="text-gray-100 text-center mt-8 text-xl">{`No deals match "${searchQuery}"`}</p>
        )}
        {!loading && deals && deals.length > 0 && (
          <div className="overflow-scroll grow flex flex-col gap-y-4 p-8 pb-20 items-stretch max-h-[100%]">
            {deals.map((deal) => (
              <Link
                key={deal.id}
                href={deal.link}
                className=" py-8 px-4 bg-gray-800 border border-gray-200 rounded-lg shadow hover:scale-[1.02] hover:border-teal-500 hover:border-4 hover:rotate-1 cursor-pointer transition duration-300 ease-in-out relative block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="text-2xl font-bold tracking-tight text-gray-200">
                  {deal.name}
                </h2>
                <p className="font-normal text-md text-gray-300 line-clamp-4 mt-2">
                  {deal.description}
                </p>
                {deal.coupon && (
                  <p className="mt-4 text-sm font-medium text-gray-400">
                    Coupon Code: <ClickableCouponCode coupon={deal.coupon} />
                    {deal.couponPercent && (
                      <span>{`(${deal.couponPercent}% off)`}</span>
                    )}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </Overlay>
    </>
  );
}
