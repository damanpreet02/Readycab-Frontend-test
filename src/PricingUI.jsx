import React, { useState } from 'react';

function PricingUI() {
  const [distance, setDistance] = useState(0);
  const [applySurcharge, setApplySurcharge] = useState(false);
  const [applyAc, setApplyAc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const accent = "#10b981";
  const cardStyle = {
    background: "#0f172a",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #1f2937",
    marginTop: "20px"
  };

  const th = {
    padding: "8px",
    textAlign: "left",
    borderBottom: "1px solid #374151",
    color: "#e5e7eb"
  };
  const thRight = { ...th, textAlign: "right" };
  const td = {
    padding: "8px",
    borderBottom: "1px solid #374151",
    color: "#e5e7eb"
  };
  const tdRight = { ...td, textAlign: "right" };

  const Row = ({ i, t, p, d, a }) => (
    <tr style={{ background: i % 2 === 0 ? "#020617" : "#0f172a" }}>
      <td style={td}>{t}</td>
      <td style={tdRight}>₹ {p}</td>
      <td style={tdRight}>{a ? `₹ ${a}` : ''}</td>
      <td style={tdRight}>{d ? `₹ ${d}` : ''}</td>
      
    </tr>
  );

  const fetchPricing = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicle_id: "689b2ef954f6141162c53b74",
          distance: parseFloat(distance),
          applySurcharge,
          applyAc
        })
      });
      const data = await response.json();
      console.log(response.json)
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", background: "#020617", color: "#e5e7eb", minHeight: "100vh" }}>
      <h1 style={{ color: accent }}>ReadyCab Pricing Calculator</h1>

      <div style={{ background: "#0f172a", padding: "20px", borderRadius: "12px", border: "1px solid #1f2937" }}>

        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>

          {/* Distance Input */}
          <div>
            <label style={{ display: "block", fontSize: "12px", color: "#9ca3af" }}>
              Enter Distance (km)
            </label>
            <input
              type="number"
              value={distance}
              onChange={e => setDistance(e.target.value)}
              style={{
                padding: "6px 8px",
                borderRadius: "6px",
                border: "1px solid #374151",
                background: "#020617",
                color: "#e5e7eb"
              }}
            />
          </div>

          {/* APPLY SURCHARGE SLIDER */}
          {/* APPLY SURCHARGE - PREVIEW STYLE TOGGLE */}
<div>
  <label style={{ display: "block", fontSize: "12px", color: "#9ca3af", marginBottom: "6px" }}>
    Apply Surcharge
  </label>

  <div
    onClick={() => setApplySurcharge(!applySurcharge)}
    style={{
      width: "46px",
      height: "24px",
      borderRadius: "999px",
      background: applySurcharge ? "#10b981" : "#374151",
      position: "relative",
      cursor: "pointer",
      transition: "0.3s"
    }}
  >
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: "#e5e7eb",
        position: "absolute",
        top: "2px",
        left: applySurcharge ? "24px" : "2px",
        transition: "0.3s"
      }}
    />
  </div>
</div>

<div>
  <label style={{ display: "block", fontSize: "12px", color: "#9ca3af", marginBottom: "6px" }}>
    Apply Ac
  </label>

  <div
    onClick={() => setApplyAc(!applyAc)}
    style={{
      width: "46px",
      height: "24px",
      borderRadius: "999px",
      background: applyAc ? "#10b981" : "#374151",
      position: "relative",
      cursor: "pointer",
      transition: "0.3s"
    }}
  >
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: "#e5e7eb",
        position: "absolute",
        top: "2px",
        left: applyAc ? "24px" : "2px",
        transition: "0.3s"
      }}
    />
  </div>
</div>


          {/* Calculate Button */}
          <button
            onClick={fetchPricing}
            disabled={loading}
            style={{
              marginLeft: "12px",
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: accent,
              color: "#020617",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            {loading ? "Calculating..." : "Calculate"}
          </button>

        </div>
      </div>

      {result && (
        <div style={cardStyle}>
          <h3>Total Trip Price to be Paid by Customer</h3>
          <h1 style={{ color: accent }}>₹ {result.total_trip_price_to_be_paid_by_customer}</h1>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
            <div style={{ background: "#020617", padding: "12px", borderRadius: "10px", border: "1px solid #1f2937" }}>
              <div style={{ fontSize: "12px", color: "#9ca3af" }}>App Earning (Subtotal)</div>
              <div style={{ fontSize: "18px", fontWeight: 600, textAlign: "right", color: accent }}>
                ₹ {result.basic_app_earning}
              </div>
            </div>

            <div style={{ background: "#020617", padding: "12px", borderRadius: "10px", border: "1px solid #1f2937" }}>
              <div style={{ fontSize: "12px", color: "#9ca3af" }}>Driver Earning (Subtotal)</div>
              <div style={{ fontSize: "18px", fontWeight: 600, textAlign: "right", color: accent }}>
                ₹ {result.basic_driver_earning}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            style={{ marginBottom: "12px", background: "transparent", color: accent, border: "none", cursor: "pointer" }}
          >
            {showBreakdown ? "Hide Full Breakdown ↓" : "Show Full Breakdown ↑"}
          </button>

          {showBreakdown && (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#020617" }}>
                  <th style={th}>Title</th>
                  <th style={thRight}>Price (₹)</th>
                  <th style={thRight}>App Payment (₹)</th>
                  <th style={thRight}>Driver Payment (₹)</th>
                </tr>
              </thead>
              <tbody>
                <Row i={0} t="Base Fee" p={result.base_fare} />
                <Row i={1} t="Charges for km" p={result.charges_per_km} />
                <Row i={2} t="Surcharge" p={result.surcharge} />
                <Row i={3} t="Platform fee" p={result.platform_fee} a={result.platform_fee} />
                <Row i={4} t="Infrastructure fee" p={result.infrastructure_fee} a={result.infrastructure_fee} />
                <Row i={5} t="Basic Trip amount" p={result.basic_trip_amount} />
                <Row i={6} t="Insurance fee" p={result.insurance_fee} a={result.insurance_fee} />
                <Row i={7} t="City fee" p={result.city_fee} a={result.city_fee} />
                <Row i={8} t="GST for Driver" p={result.gst_for_driver} d={result.gst_for_driver} />
                <Row i={9} t="GST for App" p={result.gst_for_app} a={result.gst_for_app} />

                <tr style={{ fontWeight: "bold", background: "#020617" }}>
                  <td style={td}>Total Trip Price</td>
                  <td style={tdRight}>₹ {result.total_trip_price_to_be_paid_by_customer}</td>
                  <td style={tdRight}>₹ {result.total_trip_price_to_be_paid_by_customer_app_payment}</td>
                  <td style={tdRight}>₹ {result.total_trip_price_to_be_paid_by_customer_driver_payment}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default PricingUI;


