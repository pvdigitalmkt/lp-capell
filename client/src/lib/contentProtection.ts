/**
 * Content Protection Module Template
 * 
 * Copy this file to your project's lib/ directory and customize as needed.
 * Protege a aplicação contra injeção de conteúdo malicioso através de:
 * 1. Monitoramento de mutações de DOM
 * 2. Validação de integridade de conteúdo crítico
 * 3. Detecção de modificações não autorizadas
 */

interface ContentChecksum {
  selector: string;
  originalText: string;
  hash: string;
}

class ContentProtector {
  private checksums: Map<string, ContentChecksum> = new Map();
  private mutationObserver: MutationObserver | null = null;
  private isMonitoring = false;
  private suspiciousActivity = false;

  public init(): void {
    if (this.isMonitoring) return;

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupProtection());
    } else {
      this.setupProtection();
    }
  }

  private setupProtection(): void {
    this.registerCriticalContent();
    this.startMutationMonitoring();
    this.startIntegrityChecks();

    this.isMonitoring = true;
    console.log('[ContentProtector] Proteção ativada');
  }

  private registerCriticalContent(): void {
    const criticalSelectors = [
      'h1', 'h2', '.text-primary', '.text-foreground', 'button', 'a[href*="wa.me"]',
    ];

    criticalSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        const text = el.textContent || '';
        if (text.length > 0) {
          const key = `${selector}-${index}`;
          const hash = this.simpleHash(text);
          this.checksums.set(key, { selector, originalText: text, hash });
        }
      });
    });
  }

  private startMutationMonitoring(): void {
    const config: MutationObserverInit = {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['href', 'onclick', 'onerror', 'onload'],
    };

    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        this.analyzeMutation(mutation);
      });
    });

    this.mutationObserver.observe(document.body, config);
  }

  private analyzeMutation(mutation: MutationRecord): void {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as Element;

          if (el.tagName === 'SCRIPT' && el.textContent && el.textContent.length > 0) {
            console.warn('[ContentProtector] Script inline suspeito detectado', el);
            this.suspiciousActivity = true;
            el.remove();
          }

          if (el.tagName === 'IFRAME') {
            const src = el.getAttribute('src') || '';
            if (!src.includes(window.location.origin)) {
              console.warn('[ContentProtector] Iframe suspeito detectado', src);
              this.suspiciousActivity = true;
              el.remove();
            }
          }
        }
      });
    }

    if (mutation.type === 'attributes') {
      const el = mutation.target as Element;
      const attrName = mutation.attributeName || '';

      if (['onclick', 'onerror', 'onload', 'onmouseover'].includes(attrName)) {
        console.warn(`[ContentProtector] Atributo suspeito detectado: ${attrName}`, el);
        this.suspiciousActivity = true;
        el.removeAttribute(attrName);
      }
    }

    if (mutation.type === 'characterData') {
      const text = mutation.target.textContent || '';
      if (this.isSuspiciousText(text)) {
        console.warn('[ContentProtector] Texto suspeito detectado', text);
        this.suspiciousActivity = true;
      }
    }
  }

  private isSuspiciousText(text: string): boolean {
    const suspiciousPatterns = [
      /Êxtase|troféu|Quer Êxtase|Sem troféu/,
      /script|eval|function|constructor/i,
      /onclick|onerror|onload/i,
    ];

    return suspiciousPatterns.some(pattern => pattern.test(text));
  }

  private startIntegrityChecks(): void {
    setInterval(() => {
      this.validateIntegrity();
    }, 5000);
  }

  private validateIntegrity(): void {
    this.checksums.forEach((checksum, key) => {
      const elements = document.querySelectorAll(checksum.selector);
      
      elements.forEach((el, index) => {
        const text = el.textContent || '';
        const currentHash = this.simpleHash(text);

        if (currentHash !== checksum.hash && text.length > 0) {
          console.warn(
            `[ContentProtector] Modificação detectada em ${checksum.selector}`,
            { original: checksum.originalText, current: text }
          );
          this.suspiciousActivity = true;
        }
      });
    });
  }

  private simpleHash(text: string): string {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  }

  public hasSuspiciousActivity(): boolean {
    return this.suspiciousActivity;
  }

  public stop(): void {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
    this.isMonitoring = false;
  }
}

export const contentProtector = new ContentProtector();
