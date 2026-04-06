def generate_recommendations(parsed_records: list):
    recommendations = []
    
    if not parsed_records:
        return recommendations
    
    keys = list(parsed_records[0].keys())
    num_keys = [k for k in keys if isinstance(parsed_records[0][k], (int, float))]
    
    for nk in num_keys:
        vals = [r[nk] for r in parsed_records if nk in r]
        if not vals: continue
        
        avg = sum(vals) / len(vals) if len(vals) > 0 else 0
        high = max(vals)
        low = min(vals)
        
        if high > avg * 1.5:
            recommendations.append(f"Focus selectively on high-performing categories within '{nk}' to replicate structural success.")
            
        if low < avg * 0.5:
            recommendations.append(f"⚠️ Investigate drastically low-performing items within '{nk}'. Prioritize root cause analysis.")
            
        if "profit" in nk.lower() and low <= 0:
            recommendations.append(f"⚠️ Critical Optimization: Profitability drops below zero. Implement immediate cost reductions.")
            
        if len(vals) >= 4:
            cutoff = len(vals) // 2
            avg1 = sum(vals[:cutoff]) / cutoff
            avg2 = sum(vals[cutoff:]) / (len(vals) - cutoff)
            
            if avg1 > 0 and avg2 < avg1 * 0.8:
                recommendations.append(f"⚠️ Declining continuous trend detected in '{nk}'. Review historical data strategies.")
            elif avg1 > 0 and avg2 > avg1 * 1.2:
                recommendations.append(f"Strong positive growth trend observed in '{nk}'. Increase scalable investments.")

    if not recommendations:
        recommendations.append("Continue monitoring key metrics. No critical actions needed currently.")

    # Deduplicate and limit to top 3
    final_recs = list(dict.fromkeys(recommendations))[:3]
    return final_recs
