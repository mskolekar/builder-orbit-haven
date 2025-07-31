import { Phone, Mail } from 'lucide-react';

const customerData = {
  name: "Rose K",
  role: "Lawyer",
  phone: "(416) 555-0123",
  email: "rose.greenthumb@example.com",
};

export function CustomerHeader() {
  return (
    <div className="bg-[#0054A6] text-white p-4 border-b">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              RK
            </div>
            <div>
              <h2 className="text-lg font-semibold">{customerData.name}</h2>
              <p className="text-blue-100 text-sm">{customerData.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-blue-200" />
              <span className="text-sm">{customerData.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-blue-200" />
              <span className="text-sm">{customerData.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
