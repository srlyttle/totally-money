import { CreditCard } from "../../../types/credit-card";
import { Check, X, Star, Clock, HelpCircle } from "lucide-react";

interface CardDetailedInfoProps {
  card: CreditCard;
}

export const CardDetailedInfo = ({ card }: CardDetailedInfoProps) => {
  return (
    <div className="max-w-7xl mx-auto  bg-white">
      <div className="mb-12">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-medium text-gray-700">
              Representative Example
            </h3>
          </div>
          <p className="text-sm text-gray-600">
            If you spend £1,200 at a purchase interest rate of 18.9% p.a.
            (variable) your representative APR will be 18.9% APR (variable)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
        <div className="space-y-12">
          <div className="md:min-h-[215px] p-2">
            <div className="flex items-center gap-3 mb-6">
              <Check className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                What&apos;s Good
              </h3>
            </div>
            <ul className="space-y-4">
              {card.whatsGood?.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 text-base leading-relaxed flex items-start gap-3"
                >
                  <span className="text-gray-400 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:min-h-[215px] p-2">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Features</h3>
            </div>
            <ul className="space-y-4">
              {card.additionalFeatures?.map((feature, index) => (
                <li
                  key={index}
                  className="text-gray-700 text-base leading-relaxed flex items-start gap-3"
                >
                  <span className="text-gray-400 mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-12">
          <div className="md:min-h-[215px] p-2">
            <div className="flex items-center gap-3 mb-6">
              <X className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                What&apos;s Bad
              </h3>
            </div>
            <ul className="space-y-4">
              {card.whatsBad?.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-700 text-base leading-relaxed flex items-start gap-3"
                >
                  <span className="text-gray-400 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:min-h-[215px] p-2">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                Eligibility
              </h3>
            </div>
            <ul className="space-y-4">
              {card.eligibility?.map((requirement, index) => (
                <li
                  key={index}
                  className="text-gray-700 text-base leading-relaxed flex items-start gap-3"
                >
                  <span className="text-gray-400 mt-1">•</span>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <HelpCircle className="w-6 h-6 text-gray-600" />
          <h3 className="text-xl font-semibold text-gray-900">
            Rates and Fees
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-sm">
              Balance transfer offer
              <HelpCircle className="w-3 h-3 text-gray-400" />
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Intro rate:</span>
                <span className="font-medium text-gray-900">
                  {card.ratesAndFees?.balanceTransferOffer.introRate}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium text-gray-900">
                  {card.ratesAndFees?.balanceTransferOffer.duration}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Transfer fee:</span>
                <span className="font-medium text-gray-900">
                  {card.ratesAndFees?.balanceTransferOffer.transferFee}
                </span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-sm">
              Purchase offer
              <HelpCircle className="w-3 h-3 text-gray-400" />
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Intro rate:</span>
                <span className="font-medium text-gray-900">
                  {card.ratesAndFees?.purchaseOffer.introRate}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium text-gray-900">
                  {card.ratesAndFees?.purchaseOffer.duration}
                </span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-sm">
              Annual interest rates
              <HelpCircle className="w-3 h-3 text-gray-400" />
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Balance transfers:</span>
                <span className="font-medium text-gray-900">
                  {card.ratesAndFees?.annualRates.balanceTransfers}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Purchases:</span>
                <span className="font-medium text-gray-900">
                  {card.ratesAndFees?.annualRates.purchases}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Cash withdrawals:</span>
                <span className="font-medium text-gray-900">
                  {card.ratesAndFees?.annualRates.cashWithdrawals}
                </span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-sm">
              Other key facts
              <HelpCircle className="w-3 h-3 text-gray-400" />
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Annual fee:</span>
                <span className="font-medium text-gray-900">
                  {card.ratesAndFees?.otherFees.annualFee}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Overseas transaction fee:</span>
                <span className="font-medium text-gray-900">
                  {card.ratesAndFees?.otherFees.overseasTransactionFee}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
