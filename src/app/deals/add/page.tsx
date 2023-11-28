import DealForm from './DealForm';

//TODO: why doesn't this work with server component page?
// export const metadata: Metadata = {
//   title: 'Add a Black Friday Deal',
//   description: 'Share the best deals that you know developers will love!',
// };

export default function AddDealPage() {
  return (
    <main className="">
      <h1 className="text-4xl font-bold mb-10 text-gray-100 text-center">
        Share a deal?
      </h1>
      <div className="max-w-2xl mx-auto">
        <DealForm />
      </div>
    </main>
  );
}
