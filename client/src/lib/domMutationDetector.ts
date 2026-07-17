/**
 * DOM Mutation Detector Template
 * 
 * Copy this file to your project's lib/ directory and customize as needed.
 * Detecta e registra mutações suspeitas no DOM
 */

export interface MutationAlert {
  timestamp: number;
  type: 'script' | 'iframe' | 'event_handler' | 'text' | 'attribute';
  severity: 'low' | 'medium' | 'high';
  description: string;
  element?: string;
  details?: Record<string, unknown>;
}

class DOMMutationDetector {
  private alerts: MutationAlert[] = [];
  private maxAlerts = 100;
  private observer: MutationObserver | null = null;
  private isActive = false;

  public start(): void {
    if (this.isActive) return;

    const config: MutationObserverInit = {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: [
        'onclick', 'onerror', 'onload', 'onmouseover', 'onmouseenter',
        'onfocus', 'onblur', 'onchange', 'onsubmit',
      ],
    };

    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        this.analyzeMutation(mutation);
      });
    });

    this.observer.observe(document.body, config);
    this.isActive = true;

    console.log('[DOMMutationDetector] Detector iniciado');
  }

  public stop(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.isActive = false;
    console.log('[DOMMutationDetector] Detector parado');
  }

  private analyzeMutation(mutation: MutationRecord): void {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          this.analyzeAddedElement(node as Element);
        }
      });
    }

    if (mutation.type === 'attributes') {
      const el = mutation.target as Element;
      const attrName = mutation.attributeName || '';
      this.analyzeAttributeChange(el, attrName);
    }

    if (mutation.type === 'characterData') {
      this.analyzeTextChange(mutation.target);
    }
  }

  private analyzeAddedElement(element: Element): void {
    const tag = element.tagName.toLowerCase();

    if (tag === 'script') {
      const src = element.getAttribute('src');
      const content = element.textContent || '';

      if (!src || !this.isWhitelistedSource(src)) {
        this.addAlert({
          type: 'script',
          severity: 'high',
          description: `Script suspeito detectado: ${src || 'inline'}`,
          element: tag,
          details: {
            src: src || 'inline',
            contentLength: content.length,
            isInline: !src,
          },
        });
      }
    }

    if (tag === 'iframe') {
      const src = element.getAttribute('src') || '';

      if (!this.isWhitelistedSource(src)) {
        this.addAlert({
          type: 'iframe',
          severity: 'high',
          description: `Iframe suspeito detectado: ${src}`,
          element: tag,
          details: { src },
        });
      }
    }

    const eventHandlers = [
      'onclick', 'onerror', 'onload', 'onmouseover', 'onmouseenter',
      'onfocus', 'onblur',
    ];

    eventHandlers.forEach((handler) => {
      if (element.hasAttribute(handler)) {
        this.addAlert({
          type: 'event_handler',
          severity: 'medium',
          description: `Event handler inline detectado: ${handler}`,
          element: tag,
          details: { handler, value: element.getAttribute(handler) },
        });
      }
    });
  }

  private analyzeAttributeChange(element: Element, attrName: string): void {
    const suspiciousAttrs = [
      'onclick', 'onerror', 'onload', 'onmouseover', 'onmouseenter',
      'onfocus', 'onblur', 'onchange', 'onsubmit',
    ];

    if (suspiciousAttrs.includes(attrName)) {
      const value = element.getAttribute(attrName);

      this.addAlert({
        type: 'event_handler',
        severity: 'high',
        description: `Atributo suspeito modificado: ${attrName}`,
        element: element.tagName.toLowerCase(),
        details: { attribute: attrName, value },
      });
    }
  }

  private analyzeTextChange(node: Node): void {
    const text = node.textContent || '';

    const suspiciousPatterns = [
      /Êxtase|troféu/,
      /<script|javascript:|eval\(/,
      /onclick|onerror|onload/i,
    ];

    const isSuspicious = suspiciousPatterns.some((pattern) =>
      pattern.test(text)
    );

    if (isSuspicious && text.length > 0) {
      this.addAlert({
        type: 'text',
        severity: 'medium',
        description: `Texto suspeito detectado`,
        details: { text: text.substring(0, 100) },
      });
    }
  }

  private isWhitelistedSource(src: string): boolean {
    const whitelist = [
      window.location.origin,
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://cdn.jsdelivr.net',
      'https://unpkg.com',
    ];

    return whitelist.some((domain) => src.startsWith(domain));
  }

  private addAlert(alert: Omit<MutationAlert, 'timestamp'>): void {
    const fullAlert: MutationAlert = {
      ...alert,
      timestamp: Date.now(),
    };

    this.alerts.push(fullAlert);

    if (this.alerts.length > this.maxAlerts) {
      this.alerts = this.alerts.slice(-this.maxAlerts);
    }

    console.warn(`[DOMMutationDetector] ${alert.severity.toUpperCase()}: ${alert.description}`, alert.details);
  }

  public getAlerts(): MutationAlert[] {
    return [...this.alerts];
  }

  public getHighSeverityAlerts(): MutationAlert[] {
    return this.alerts.filter((alert) => alert.severity === 'high');
  }

  public clearAlerts(): void {
    this.alerts = [];
  }

  public getStatistics() {
    return {
      totalAlerts: this.alerts.length,
      highSeverity: this.alerts.filter((a) => a.severity === 'high').length,
      mediumSeverity: this.alerts.filter((a) => a.severity === 'medium').length,
      lowSeverity: this.alerts.filter((a) => a.severity === 'low').length,
      byType: {
        script: this.alerts.filter((a) => a.type === 'script').length,
        iframe: this.alerts.filter((a) => a.type === 'iframe').length,
        eventHandler: this.alerts.filter((a) => a.type === 'event_handler').length,
        text: this.alerts.filter((a) => a.type === 'text').length,
        attribute: this.alerts.filter((a) => a.type === 'attribute').length,
      },
    };
  }
}

export const domMutationDetector = new DOMMutationDetector();
