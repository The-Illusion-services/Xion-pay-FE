"use client";
import React, { useState, useContext } from "react";
import { X, CreditCard, Lock, Calendar, Mail, Phone } from "lucide-react";
import { CreateContext } from "@/src/Context/context";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import logo from "@/src/assets/logo-white.png";
import Image from "next/image";
import PaymentStatusModals from "../../app/payments/initiate/statusModal";

interface CardPaymentModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (data: PaymentFormData) => void;
  paymentReference: string;
  returnUrl: string | null 
}

interface PaymentFormData {
  cardNumber: string;
  cvv: string;
  expiryMonth: string;
  expiryYear: string;
  email: string;
  phoneNumber: string;
  fullName: string;
}

const CardPaymentModal: React.FC<CardPaymentModalProps> = ({
  isOpen,
  onClose,
  onSubmit = () => {},
  paymentReference,
  returnUrl
}) => {
  const { setIsLoading } = useContext(CreateContext).loader;
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [activeModal, setActiveModal] = useState("");

  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: "",
    cvv: "",
    expiryMonth: "",
    expiryYear: "",
    email: "",
    phoneNumber: "",
    fullName: "",
  });

  const [errors, setErrors] = useState<Partial<PaymentFormData>>({});

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const phonePatterns = {
    US: {
      code: "+1",
      pattern: /^(\d{3})(\d{3})(\d{4})$/,
      format: "($1) $2-$3",
      maxLength: 10,
    },
    UK: {
      code: "+44",
      pattern: /^(\d{4})(\d{3})(\d{4})$/,
      format: "$1 $2 $3",
      maxLength: 11,
    },
    CA: {
      code: "+1",
      pattern: /^(\d{3})(\d{3})(\d{4})$/,
      format: "($1) $2-$3",
      maxLength: 10,
    },
    AU: {
      code: "+61",
      pattern: /^(\d{3})(\d{3})(\d{3})$/,
      format: "$1 $2 $3",
      maxLength: 9,
    },
    DE: {
      code: "+49",
      pattern: /^(\d{3})(\d{4})(\d{4})$/,
      format: "$1 $2 $3",
      maxLength: 11,
    },
    FR: {
      code: "+33",
      pattern: /^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
      format: "$1 $2 $3 $4 $5",
      maxLength: 10,
    },
    IN: {
      code: "+91",
      pattern: /^(\d{5})(\d{5})$/,
      format: "$1 $2",
      maxLength: 10,
    },
    NG: {
      code: "+234",
      pattern: /^(\d{3})(\d{3})(\d{4})$/,
      format: "$1 $2 $3",
      maxLength: 10,
    },
  };

  const [selectedCountry, setSelectedCountry] =
    useState<keyof typeof phonePatterns>("US");
  const selectedCountryCode = phonePatterns[selectedCountry].code;
  // Format phone number based on selected country
  const formatPhoneNumber = (
    value: string,
    countryCode: keyof typeof phonePatterns = selectedCountry
  ) => {
    const phoneNumber = value.replace(/[^\d]/g, "");
    const pattern = phonePatterns[countryCode];

    if (!pattern) return phoneNumber;

    // Limit to max length for the country
    const limitedNumber = phoneNumber.slice(0, pattern.maxLength);

    // Apply formatting if matches pattern
    const match = limitedNumber.match(pattern.pattern);
    if (match) {
      return pattern.format.replace(
        /\$(\d)/g,
        (_, num) => match[parseInt(num)]
      );
    }

    return limitedNumber;
  };

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    let formattedValue = value;

    if (field === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (field === "phoneNumber") {
      formattedValue = formatPhoneNumber(value);
    } else if (field === "cvv") {
      formattedValue = value.replace(/[^0-9]/g, "").slice(0, 4);
    } else if (field === "expiryMonth" || field === "expiryYear") {
      formattedValue = value.replace(/[^0-9]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [field]: formattedValue,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentFormData> = {};

    // Card number validation
    const cardNumberDigits = formData.cardNumber.replace(/\s/g, "");
    if (!cardNumberDigits || cardNumberDigits.length < 13) {
      newErrors.cardNumber = "Invalid card number";
    }

    // CVV validation
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = "Invalid CVV";
    }

    // Expiry validation
    if (
      !formData.expiryMonth ||
      parseInt(formData.expiryMonth) < 1 ||
      parseInt(formData.expiryMonth) > 12
    ) {
      newErrors.expiryMonth = "Invalid month";
    }

    if (!formData.expiryYear || formData.expiryYear.length < 2) {
      newErrors.expiryYear = "Invalid year";
    }

    if (!formData.fullName || formData.fullName?.length < 3) {
      newErrors.expiryYear = "Invalid Name";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Phone validation
    const phoneDigits = formData.phoneNumber.replace(/[^\d]/g, "");
    if (!phoneDigits || phoneDigits.length < 10) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // alert(JSON.stringify(formData));
      initiatePayment(formData);
    }
  };

  const verifyPayment = async (payment_id: string) => {
    try {
      setShowModal(true);
      setActiveModal("processing");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}payments/verify/${payment_id}`,
      );
      const responseData = await response.json();
      if (!response.ok) {
        if (responseData.error === "You already have an active API key.") {
          throw new Error(responseData.error);
        }
        throw new Error("An error occured");
      }
      // setModalMsg(responseData)

      setIsLoading(false);
      if (responseData.status === "success") {
        toast.success("Payment verification successful");
        if(returnUrl){
          const url = new URL(returnUrl);
          url.searchParams.set('paymentId', payment_id);
          window.location.href = url.toString();
        }else{
          setShowModal(true);
          setActiveModal("success");
        }
        // verifyPayment(responseData.payment_id)
      }

      console.log(responseData);
    } catch (err: any) {
      toast.error(err.message);
      // setIsLoading(false);
      setShowModal(true);
      setActiveModal("failed");
      console.log(err.message);
    } finally {
      // setIsLoading(false);
      // setShowModal(false)
    }
  };
  const initiatePayment = async (formData: PaymentFormData) => {
    try {
      setShowModal(true);
      setActiveModal("processing");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}payments/initiate/${paymentReference}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: formData.email,
            expiry_month: formData.expiryMonth,
            expiry_year: `20${formData.expiryYear}`,
            phone_number: `${selectedCountryCode}${formData.phoneNumber.replaceAll(
              " ",
              ""
            )}`,
            cvv: formData.cvv,
            card_number: formData.cardNumber.replaceAll(" ", ""),
            fullname: formData.fullName,
          }),
          headers: {
            "Content-Type": "application/json"
            // authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        if (responseData.error === "Invalid or expired payment reference") {
          throw new Error(responseData.error);
        }
        throw new Error("An error occured");
      }
      // setModalMsg(responseData)
      setIsLoading(false);
      if (responseData.status === "success") {
        toast.success("Payment initiated successfully");
        verifyPayment(responseData.payment_id);
      }

      // setPaymentLink(false);
      // setMsg(` ${responseData.key}`);
      // setShowModal(true);
      console.log(responseData);
    } catch (err: any) {
      toast.error(err.message);
      // setIsLoading(false);
      setShowModal(true);
      setActiveModal("failed");
      console.log(err.message);
    } finally {
      // setIsLoading(false);
      // setShowModal(false)
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  return (
    <>
      <PaymentStatusModals
        showModal={showModal}
        setActiveModal={setActiveModal}
        activeModal={activeModal}
        setShowModal={setShowModal}
      />
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4">
        <div className="bg-gray_primary rounded-2xl shadow-2xl w-full max-w-md border border-gray-700 animate-in fade-in zoom-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className=" flex items-center ">
                <Image src={logo} alt="logo" className="h-8 w-20" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Payment Details
                </h2>
                <p className="text-sm text-gray-400">
                  Enter your card information
                </p>
              </div>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6 h-[400px] overflow-y-auto ">
            {/* Card Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    handleInputChange("cardNumber", e.target.value)
                  }
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className={`w-full px-4 py-3 border-[#474747] bg-transparent border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white_primary focus:border-transparent transition-all ${
                    errors.cardNumber ? "border-red-500" : "border-gray-600"
                  }`}
                />
                <CreditCard className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              </div>
              {errors.cardNumber && (
                <p className="text-red-400 text-sm">{errors.cardNumber}</p>
              )}
            </div>

            {/* CVV and Expiry */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">CVV</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    placeholder="123"
                    maxLength={4}
                    className={`w-full px-4 py-3 border-[#474747] bg-transparent border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.cvv ? "border-red-500" : "border-gray-600"
                    }`}
                  />
                  <Lock className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                </div>
                {errors.cvv && (
                  <p className="text-red-400 text-xs">{errors.cvv}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Month
                </label>
                <select
                  value={formData.expiryMonth}
                  onChange={(e) =>
                    handleInputChange("expiryMonth", e.target.value)
                  }
                  className={`w-full px-4 py-3 border-[#474747] bg-transparent border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.expiryMonth ? "border-red-500" : "border-gray-600"
                  }`}
                >
                  <option value="">MM</option>
                  {months.map((month) => (
                    <option
                      className="text-gray_primary"
                      key={month}
                      value={month}
                    >
                      {month}
                    </option>
                  ))}
                </select>
                {errors.expiryMonth && (
                  <p className="text-red-400 text-xs">{errors.expiryMonth}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Year
                </label>
                <select
                  value={formData.expiryYear}
                  onChange={(e) =>
                    handleInputChange("expiryYear", e.target.value)
                  }
                  className={`w-full px-4 py-3 border-[#474747] bg-transparent border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.expiryYear ? "border-red-500" : "border-gray-600"
                  }`}
                >
                  <option value="">YY</option>
                  {years.map((year) => (
                    <option
                      className="text-gray_primary"
                      key={year}
                      value={year.toString().slice(-2)}
                    >
                      {year.toString().slice(-2)}
                    </option>
                  ))}
                </select>
                {errors.expiryYear && (
                  <p className="text-red-400 text-xs">{errors.expiryYear}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 border-[#474747] bg-transparent border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.email ? "border-red-500" : "border-gray-600"
                  }`}
                />
                <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              </div>
              {errors.fullName && (
                <p className="text-red-400 text-sm">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 border-[#474747] bg-transparent border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.email ? "border-red-500" : "border-gray-600"
                  }`}
                />
                <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Phone Number
              </label>
              <div className="flex gap-2">
                {/* Country Code Selector */}
                <select
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(
                      e.target.value as keyof typeof phonePatterns
                    );
                    // Clear phone number when country changes
                    setFormData((prev) => ({ ...prev, phoneNumber: "" }));
                  }}
                  className="px-3 py-3 border-[#474747] bg-transparent rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-w-[100px] border"
                >
                  {Object.entries(phonePatterns).map(([code, pattern]) => (
                    <option
                      className="text-gray_primary"
                      key={code}
                      value={code}
                    >
                      {pattern.code} {code}
                    </option>
                  ))}
                </select>

                {/* Phone Number Input */}
                <div className="relative flex-1">
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    placeholder={
                      selectedCountry === "US"
                        ? "(555) 123-4567"
                        : selectedCountry === "UK"
                        ? "7700 900 123"
                        : selectedCountry === "NG"
                        ? "803 123 4567"
                        : selectedCountry === "IN"
                        ? "98765 43210"
                        : selectedCountry === "FR"
                        ? "01 23 45 67 89"
                        : "123 456 7890"
                    }
                    maxLength={phonePatterns[selectedCountry]?.maxLength + 5} // Extra space for formatting
                    className={`w-full px-4 py-3 border-[#474747] bg-transparent rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white_primary border focus:border-transparent transition-all ${
                      errors.phoneNumber ? "border-red-500" : "border-gray-600"
                    }`}
                  />
                  <Phone className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>
              {errors.phoneNumber && (
                <p className="text-red-400 text-sm">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-white_primary text-gray_primary font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Complete Payment
            </button>

            {/* Security Notice */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <Lock className="w-4 h-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPaymentModal;
