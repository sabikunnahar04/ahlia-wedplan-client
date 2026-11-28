
const SubscriptionSuccessPage = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border p-8 text-center">
        <h1 className="text-2xl font-bold text-[#245C45]">
          Payment Successful!
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for upgrading to WedPlan Premium.
          Your payment is being processed.
        </p>

        <p className="mt-3 text-sm text-gray-500">
          Your Premium plan will be activated after payment verification.
        </p>

        <a
          href="/dashboard/vendor/subscription"
          className="mt-6 inline-block rounded-lg bg-[#245C45] px-6 py-3 text-white hover:bg-[#173F31]"
        >
          Back to Subscription
        </a>
      </div>
    </div>
  );
};

export default SubscriptionSuccessPage;
