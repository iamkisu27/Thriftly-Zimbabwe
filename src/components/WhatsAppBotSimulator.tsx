import React, { useState } from 'react';
import { Language, OrderReservation } from '../types';
import { Send, CheckCheck, Bot, RefreshCw } from 'lucide-react';

interface WhatsAppBotSimulatorProps {
  currentLang: Language;
  orders: OrderReservation[];
  darkMode?: boolean;
  onAcceptOrder: (orderId: string) => void;
  onMarkSold: (orderId: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const WhatsAppBotSimulator: React.FC<WhatsAppBotSimulatorProps> = ({
  currentLang,
  orders,
  darkMode = false,
  onAcceptOrder,
  onMarkSold,
}) => {
  const getInitialMessages = (): ChatMessage[] => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (currentLang === 'sn') {
      return [
        {
          id: '1',
          sender: 'bot',
          text: `Mhoro Amai Tinashe! 👋\nTikugashirei kuThriftly Zimbabwe WhatsApp Bot.\n\nSarudza zvaunoda kuita:\n1️⃣ Ona zvinhu zvakumbirwa kuchengetwa nhasi\n2️⃣ Tambira reservation (Nyora: 2 kana 'ndatambira')\n3️⃣ Isa kuti mbatya dzatengeswa\n4️⃣ Vhara stendi nhasi`,
          time,
        },
      ];
    } else if (currentLang === 'nd') {
      return [
        {
          id: '1',
          sender: 'bot',
          text: `Salibonani Baba Jabulani! 👋\nSiyalemukela kuThriftly WhatsApp Bot.\n\nKhetha ofuna ukukwenza:\n1️⃣ Bona impahla ezicelwe ukubekelwa namuhla\n2️⃣ Yamukela ukubekelwa (Bhala: 2 kumbe 'ngiyavuma')\n3️⃣ Faka ukuthi kuthengisiwe esitendini\n4️⃣ Vala isitendi namuhla`,
          time,
        },
      ];
    }
    return [
      {
        id: '1',
        sender: 'bot',
        text: `Hello Thriftly Vendor! 👋\nWelcome to your WhatsApp Stand Assistant.\n\nReply with a number:\n1️⃣ View today's reservations & holds\n2️⃣ Accept reservation\n3️⃣ Mark item as sold at stand\n4️⃣ Toggle stand closed today`,
        time,
      },
    ];
  };

  const [messages, setMessages] = useState<ChatMessage[]>(getInitialMessages);
  const [inputText, setInputText] = useState('');

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    setTimeout(() => {
      const respTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const lower = text.toLowerCase();
      let reply = '';

      const pendingOrder = orders.find((o) => o.status === 'pending_confirmation' || o.status === 'confirmed');

      if (lower === '1' || lower.includes('ona') || lower.includes('view') || lower.includes('bona')) {
        if (orders.length > 0) {
          reply = `📋 *Nhasi mune maReservation ${orders.length}:*\n` +
            orders.map((o, idx) => `${idx + 1}. ${o.itemTitle} (${o.code}) - ${o.timeSlot || 'Today'}`).join('\n') +
            `\n\nKuti utambire, pinda '2' kana nyora kodhi yechiitiko.`;
        } else {
          reply = `Hapana reservations dziri kumirira pari zvino. Tichakutumira message mutengi paanongochengetedza!`;
        }
      } else if (
        lower === '2' ||
        lower.includes('accept') ||
        lower.includes('ndatambira') ||
        lower.includes('ngiyavuma') ||
        lower.includes('tambira')
      ) {
        if (pendingOrder) {
          onAcceptOrder(pendingOrder.id);
          reply = `✅ *Zvatsimbiswa!* Wabvuma kuchengetera mutengi chigadzirwa (${pendingOrder.code}).\nNguva yekubata: 75 min grace period. Mutengi achauya pastendi yako.`;
        } else {
          reply = `✅ Zvose zviri pachirongwa! Hapana zviri kumirira kutambirwa pari zvino.`;
        }
      } else if (
        lower === '3' ||
        lower.includes('sold') ||
        lower.includes('chatengeswa') ||
        lower.includes('kuthengisiwe')
      ) {
        if (pendingOrder) {
          onMarkSold(pendingOrder.id);
          reply = `🎉 *Makorokoto! / Amhlophe!*\nChigadzirwa ${pendingOrder.code} chanyorwa kuti chatengeswa pastendi yako. Mari yapinda munhoroondo yenyu.`;
        } else {
          reply = `Pinda kodhi yehembe yawatengesa (semuenzaniso: TH-8291).`;
        }
      } else if (lower === '4' || lower.includes('vhara') || lower.includes('close') || lower.includes('vala')) {
        reply = `🔴 *Stendi Yenyu Yanyorwa Kuti Yakavharwa Nhasi.*\nVatengi havasi kuzokwanisa kuona zvinhu zviri pastendi ino kusvika wazarura mangwana. Nyora 'open' kana wadzoka.`;
      } else {
        reply = `Handisi kunyatsonzwisisa izwi iroro. 🤔\nNdapota pinda:\n1 - Ona ma-holds\n2 - Tambira (ndatambira)\n3 - Isa kuti chatengeswa\nKana kuti unoda kutaura neThriftly agent wepanzvimbo?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: reply,
          time: respTime,
        },
      ]);
    }, 600);
  };

  const resetChat = () => {
    setMessages(getInitialMessages());
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <div
        className={`rounded-3xl border shadow-lg overflow-hidden flex flex-col h-[640px] ${
          darkMode ? 'bg-[#18181b] border-stone-800' : 'bg-white border-stone-200'
        }`}
      >
        {/* WhatsApp App Bar */}
        <div className="bg-[#166534] text-white px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center font-bold text-white shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm leading-tight flex items-center gap-1.5">
                <span>Thriftly Stand Bot</span>
                <span className="w-2 h-2 rounded-full bg-[#eab308] animate-pulse" />
              </div>
              <div className="text-[11px] text-emerald-100">
                Local Market Vendor Channel (+263 77 900 1100)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetChat}
              className="p-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white transition cursor-pointer"
              title="Reset conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Info strip */}
        <div
          className={`px-4 py-1.5 text-[11px] border-b flex items-center justify-between ${
            darkMode
              ? 'bg-stone-900 border-stone-800 text-stone-300'
              : 'bg-emerald-50 border-emerald-100 text-emerald-900'
          }`}
        >
          <span>📲 Vendor WhatsApp & USSD simulator (No smartphone required)</span>
          <span className="font-bold text-[#eab308] text-[10px] uppercase">Online</span>
        </div>

        {/* Chat message history */}
        <div
          className={`flex-1 p-4 overflow-y-auto space-y-3 ${
            darkMode ? 'bg-[#0f0f11]' : 'bg-[#f4ede4]'
          }`}
        >
          {messages.map((m) => {
            const isBot = m.sender === 'bot';
            return (
              <div
                key={m.id}
                className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-xs text-sm relative ${
                    isBot
                      ? darkMode
                        ? 'bg-[#1f1f23] text-stone-100 rounded-tl-xs border border-stone-800'
                        : 'bg-white text-stone-900 rounded-tl-xs'
                      : darkMode
                      ? 'bg-[#166534] text-white rounded-tr-xs'
                      : 'bg-[#DCF8C6] text-stone-900 rounded-tr-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed text-xs sm:text-sm">{m.text}</p>
                  <div
                    className={`flex items-center justify-end gap-1 text-[10px] mt-1 ${
                      darkMode ? 'text-stone-400' : 'text-stone-500'
                    }`}
                  >
                    <span>{m.time}</span>
                    {!isBot && <CheckCheck className="w-3.5 h-3.5 text-blue-400" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Suggestion Chips */}
        <div
          className={`p-2 border-t flex flex-wrap gap-1.5 ${
            darkMode ? 'bg-[#18181b] border-stone-800' : 'bg-stone-100 border-stone-200'
          }`}
        >
          <button
            onClick={() => handleSend('1')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border cursor-pointer ${
              darkMode ? 'bg-stone-800 border-stone-700 text-stone-200' : 'bg-white border-stone-300 text-stone-700'
            }`}
          >
            1️⃣ View Reservations
          </button>
          <button
            onClick={() => handleSend('2')}
            className="px-3 py-1 rounded-full bg-[#eab308] text-black border border-black/20 text-xs font-bold cursor-pointer"
          >
            2️⃣ Accept (Ndatambira / Ngiyavuma)
          </button>
          <button
            onClick={() => handleSend('3')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border cursor-pointer ${
              darkMode ? 'bg-stone-800 border-stone-700 text-stone-200' : 'bg-white border-stone-300 text-stone-700'
            }`}
          >
            3️⃣ Mark Sold
          </button>
          <button
            onClick={() => handleSend('4')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border cursor-pointer ${
              darkMode ? 'bg-stone-800 border-stone-700 text-stone-200' : 'bg-white border-stone-300 text-stone-700'
            }`}
          >
            4️⃣ Close Stand
          </button>
        </div>

        {/* Chat input */}
        <div
          className={`p-3 border-t flex items-center gap-2 ${
            darkMode ? 'bg-[#18181b] border-stone-800' : 'bg-white border-stone-200'
          }`}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type 1, 2, 'ndatambira', 'ngiyavuma'..."
            className={`flex-1 px-4 py-2.5 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-[#166534] ${
              darkMode ? 'bg-[#121212] border-stone-700 text-white' : 'bg-white border-stone-300 text-stone-900'
            }`}
          />
          <button
            type="button"
            onClick={() => handleSend()}
            className="w-10 h-10 rounded-full bg-[#166534] hover:bg-[#14532d] text-white flex items-center justify-center transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
