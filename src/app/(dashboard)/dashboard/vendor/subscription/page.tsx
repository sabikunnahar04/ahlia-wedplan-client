
const VendorSubscriptionPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#245C45]">
        Subscription
      </h1>

      <p className="mt-2 text-gray-600">
        Manage your subscription plan.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Free Plan */}
        <div className="rounded-xl border p-6">
          <h2 className="text-xl font-bold text-[#245C45]">
            Free Plan
          </h2>

          <p className="mt-3 text-3xl font-bold">
            $0
            <span className="text-sm font-normal text-gray-500">
              {" "}/ month
            </span>
          </p>

          <ul className="mt-6 space-y-3 text-gray-600">
            <li>✓ Maximum 3 active services</li>
            <li>✓ Basic dashboard</li>
            <li>✓ Booking request management</li>
          </ul>

          <button
            disabled
            className="mt-8 w-full rounded-lg bg-gray-200 py-3 font-medium text-gray-600"
          >
            Free Plan
          </button>
        </div>

        
        <div className="rounded-xl border-2 border-[#245C45] p-6">
          <h2 className="text-xl font-bold text-[#245C45]">
            Premium Plan
          </h2>

          <p className="mt-3 text-3xl font-bold">
            Premium
          </p>

          <ul className="mt-6 space-y-3 text-gray-600">
            <li>✓ Unlimited active services</li>
            <li>✓ Premium Vendor Badge</li>
            <li>✓ Basic dashboard</li>
            <li>✓ Booking request management</li>
          </ul>

          <button
            className="mt-8 w-full rounded-lg bg-[#245C45] py-3 font-medium text-white hover:bg-[#173F31]"
          >
            Upgrade to Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorSubscriptionPage;
