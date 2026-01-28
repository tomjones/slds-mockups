import React, { useState } from 'react';
import Button from '@salesforce/design-system-react/components/button';
import Icon from '@salesforce/design-system-react/components/icon';

/**
 * FormulaComponents Mockup
 *
 * This mockup demonstrates components available on the Formula object,
 * starting with an improved Formulation Line Items component that allows
 * viewing and reordering ingredients within phases.
 */

const FormulaComponents = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);

  // Component Card wrapper
  const ComponentCard = ({ title, children, icon }) => (
    <div style={{
      backgroundColor: 'white',
      border: '2px solid #0176d3',
      borderRadius: '4px',
      padding: '20px',
      marginBottom: '24px',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '-12px',
        left: '16px',
        backgroundColor: '#0176d3',
        color: 'white',
        padding: '4px 12px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        Component
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px'
      }}>
        {icon && <Icon category="utility" name={icon} size="small" />}
        <h3 className="slds-text-heading_small" style={{ margin: 0 }}>{title}</h3>
      </div>
      {children}
    </div>
  );

  // Sample formula data
  const formula = {
    name: 'Premium Moisturizing Cream Base',
    formulaCode: 'FRM-2024-0125',
    version: '3.2',
    status: 'Active',
    totalIngredients: 12
  };

  // Sample phase data with ingredients
  const [phases, setPhases] = useState([
    {
      id: 'phase-a',
      name: 'Phase A',
      itemCount: 4,
      ingredients: [
        {
          id: 'ing-1',
          product: 'Miglyol Coco 810',
          productLink: '#',
          inciName: 'Coco-Caprylate/Caprate',
          supplier: 'IOI Oleo GmbH',
          formulationPercent: 25.00,
          particle100um: 0.50,
          batchQuantity: 125.00,
          uom: 'KG'
        },
        {
          id: 'ing-2',
          product: 'GreenSolv Clear',
          productLink: '#',
          inciName: 'Natural Solvent Complex',
          supplier: 'Green Ingredients Ltd',
          formulationPercent: 15.00,
          particle100um: 0.30,
          batchQuantity: 75.00,
          uom: 'KG'
        },
        {
          id: 'ing-3',
          product: 'Vitamin E Oil',
          productLink: '#',
          inciName: 'Tocopherol',
          supplier: 'Premium Vitamins Inc',
          formulationPercent: 5.00,
          particle100um: 0.20,
          batchQuantity: 25.00,
          uom: 'KG'
        },
        {
          id: 'ing-4',
          product: 'Cetyl Alcohol',
          productLink: '#',
          inciName: 'Cetyl Alcohol',
          supplier: 'Emollient Solutions',
          formulationPercent: 5.00,
          particle100um: 0.15,
          batchQuantity: 25.00,
          uom: 'KG'
        }
      ]
    },
    {
      id: 'phase-b',
      name: 'Phase B',
      itemCount: 3,
      ingredients: [
        {
          id: 'ing-5',
          product: 'Distilled Water',
          productLink: '#',
          inciName: 'Aqua',
          supplier: 'Pure Water Supply Co',
          formulationPercent: 35.00,
          particle100um: 0.00,
          batchQuantity: 175.00,
          uom: 'KG'
        },
        {
          id: 'ing-6',
          product: 'GreenGard PA3',
          productLink: '#',
          inciName: 'Preservative Blend',
          supplier: 'Natural Ingredients Co',
          formulationPercent: 2.50,
          particle100um: 0.10,
          batchQuantity: 12.50,
          uom: 'KG'
        },
        {
          id: 'ing-7',
          product: 'Xanthan Gum',
          productLink: '#',
          inciName: 'Xanthan Gum',
          supplier: 'Thickener Specialists',
          formulationPercent: 0.50,
          particle100um: 0.05,
          batchQuantity: 2.50,
          uom: 'KG'
        }
      ]
    },
    {
      id: 'phase-c',
      name: 'Phase C',
      itemCount: 5,
      ingredients: [
        {
          id: 'ing-8',
          product: 'Organic Glycerin / Stock',
          productLink: '#',
          inciName: 'Glycerin',
          supplier: 'Natural Ingredients Co',
          formulationPercent: 8.00,
          particle100um: 0.00,
          batchQuantity: 40.00,
          uom: 'KG'
        },
        {
          id: 'ing-9',
          product: 'Hyaluronic Acid',
          productLink: '#',
          inciName: 'Sodium Hyaluronate',
          supplier: 'Active Ingredients Ltd',
          formulationPercent: 1.00,
          particle100um: 0.08,
          batchQuantity: 5.00,
          uom: 'KG'
        },
        {
          id: 'ing-10',
          product: 'Chamomile Extract',
          productLink: '#',
          inciName: 'Chamomilla Recutita Extract',
          supplier: 'Botanical Extracts Co',
          formulationPercent: 2.00,
          particle100um: 0.12,
          batchQuantity: 10.00,
          uom: 'KG'
        },
        {
          id: 'ing-11',
          product: 'Lavender Essential Oil',
          productLink: '#',
          inciName: 'Lavandula Angustifolia Oil',
          supplier: 'Essential Oils Direct',
          formulationPercent: 0.50,
          particle100um: 0.03,
          batchQuantity: 2.50,
          uom: 'KG'
        },
        {
          id: 'ing-12',
          product: 'Citric Acid',
          productLink: '#',
          inciName: 'Citric Acid',
          supplier: 'pH Adjusters Inc',
          formulationPercent: 0.50,
          particle100um: 0.02,
          batchQuantity: 2.50,
          uom: 'KG'
        }
      ]
    }
  ]);

  // Drag and drop handlers
  const handleDragStart = (e, phaseId, ingredientId) => {
    setDraggedItem({ phaseId, ingredientId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetPhaseId, targetIndex) => {
    e.preventDefault();

    if (!draggedItem || draggedItem.phaseId !== targetPhaseId) {
      // Only allow reordering within the same phase
      return;
    }

    setPhases(prevPhases => {
      return prevPhases.map(phase => {
        if (phase.id === targetPhaseId) {
          const ingredients = [...phase.ingredients];
          const draggedIndex = ingredients.findIndex(ing => ing.id === draggedItem.ingredientId);
          const [removed] = ingredients.splice(draggedIndex, 1);
          ingredients.splice(targetIndex, 0, removed);

          return {
            ...phase,
            ingredients
          };
        }
        return phase;
      });
    });

    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f3f3', padding: '24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Formulation Line Items Component */}
        <ComponentCard title="Formulation Line Items" icon="recipe">
          {/* Instructional Text */}
          <div style={{
            marginBottom: '16px',
            padding: '8px 12px',
            backgroundColor: '#f3f3f3',
            borderRadius: '4px',
            fontSize: '13px',
            color: '#706e6b'
          }}>
            Drag and drop items to reorder them within their phase. Items can only be reordered within the same phase.
          </div>

          {/* Phases */}
          <div>
            {phases.map((phase, phaseIndex) => (
              <div
                key={phase.id}
                style={{
                  marginBottom: phaseIndex < phases.length - 1 ? '24px' : '0'
                }}
              >
                {/* Phase Header */}
                <div style={{
                  padding: '12px 16px',
                  backgroundColor: '#f3f3f3',
                  borderRadius: '4px 4px 0 0',
                  borderBottom: '2px solid #dddbda'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon category="utility" name="layers" size="x-small" />
                      <span className="slds-text-heading_small" style={{ fontWeight: '600' }}>
                        {phase.name}
                      </span>
                      <span className="slds-text-body_small" style={{ color: '#706e6b' }}>
                        ({phase.itemCount} {phase.itemCount === 1 ? 'item' : 'items'})
                      </span>
                    </div>
                    <Button
                      label="Add Product"
                      variant="neutral"
                      iconCategory="utility"
                      iconName="add"
                      iconPosition="left"
                      size="small"
                    />
                  </div>
                </div>

                {/* Ingredients Table */}
                <div style={{
                  border: '1px solid #dddbda',
                  borderTop: 'none',
                  borderRadius: '0 0 4px 4px',
                  overflowX: 'auto'
                }}>
                  <table className="slds-table slds-table_bordered slds-table_cell-buffer" style={{ marginBottom: 0, minWidth: '1100px' }}>
                    <thead>
                      <tr className="slds-line-height_reset" style={{ backgroundColor: '#fafaf9' }}>
                        <th scope="col" style={{ width: '40px', padding: '12px 8px' }}>
                          <span className="slds-assistive-text">Drag Handle</span>
                        </th>
                        <th scope="col" style={{ padding: '12px', minWidth: '200px' }}>
                          <div className="slds-truncate" style={{ fontWeight: '700', fontSize: '12px' }}>
                            Product
                          </div>
                        </th>
                        <th scope="col" style={{ padding: '12px', minWidth: '180px' }}>
                          <div className="slds-truncate" style={{ fontWeight: '700', fontSize: '12px' }}>
                            INCI Name
                          </div>
                        </th>
                        <th scope="col" style={{ padding: '12px', minWidth: '150px' }}>
                          <div className="slds-truncate" style={{ fontWeight: '700', fontSize: '12px' }}>
                            Supplier
                          </div>
                        </th>
                        <th scope="col" style={{ padding: '12px', textAlign: 'right', width: '120px' }}>
                          <div className="slds-truncate" style={{ fontWeight: '700', fontSize: '12px' }}>
                            Formulation %
                          </div>
                        </th>
                        <th scope="col" style={{ padding: '12px', textAlign: 'right', width: '100px' }}>
                          <div className="slds-truncate" style={{ fontWeight: '700', fontSize: '12px' }}>
                            100 µm
                          </div>
                        </th>
                        <th scope="col" style={{ padding: '12px', textAlign: 'right', width: '130px' }}>
                          <div className="slds-truncate" style={{ fontWeight: '700', fontSize: '12px' }}>
                            Batch Quantity
                          </div>
                        </th>
                        <th scope="col" style={{ padding: '12px', textAlign: 'center', width: '100px' }}>
                          <div className="slds-truncate" style={{ fontWeight: '700', fontSize: '12px' }}>
                            Actions
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {phase.ingredients.map((ingredient, index) => {
                        const isHovered = hoveredRow === `${phase.id}-${ingredient.id}`;
                        const isDragging = draggedItem?.ingredientId === ingredient.id;

                        return (
                          <tr
                            key={ingredient.id}
                            className="slds-hint-parent"
                            draggable
                            onDragStart={(e) => handleDragStart(e, phase.id, ingredient.id)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, phase.id, index)}
                            onDragEnd={handleDragEnd}
                            onMouseEnter={() => setHoveredRow(`${phase.id}-${ingredient.id}`)}
                            onMouseLeave={() => setHoveredRow(null)}
                            style={{
                              backgroundColor: isDragging ? '#f3f3f3' : 'white',
                              opacity: isDragging ? 0.5 : 1,
                              cursor: 'move',
                              transition: 'background-color 0.1s'
                            }}
                          >
                            {/* Drag Handle */}
                            <td style={{ padding: '12px 8px', verticalAlign: 'middle' }}>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: isHovered ? 1 : 0.3,
                                transition: 'opacity 0.2s'
                              }}>
                                <Icon
                                  category="utility"
                                  name="rows"
                                  size="x-small"
                                  colorVariant="default"
                                  style={{ cursor: 'grab' }}
                                />
                              </div>
                            </td>

                            {/* Product */}
                            <td style={{ padding: '12px', verticalAlign: 'middle' }}>
                              {ingredient.productLink ? (
                                <a
                                  href={ingredient.productLink}
                                  style={{
                                    color: '#0176d3',
                                    textDecoration: 'none',
                                    fontWeight: '500'
                                  }}
                                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                >
                                  {ingredient.product}
                                </a>
                              ) : (
                                <span style={{ color: '#706e6b', fontStyle: 'italic' }}>
                                  {ingredient.product}
                                </span>
                              )}
                            </td>

                            {/* INCI Name */}
                            <td style={{ padding: '12px', verticalAlign: 'middle' }}>
                              <span className="slds-truncate">
                                {ingredient.inciName || '—'}
                              </span>
                            </td>

                            {/* Supplier */}
                            <td style={{ padding: '12px', verticalAlign: 'middle' }}>
                              <span className="slds-truncate" style={{ color: '#706e6b' }}>
                                {ingredient.supplier || '—'}
                              </span>
                            </td>

                            {/* Formulation % */}
                            <td style={{ padding: '12px', textAlign: 'right', verticalAlign: 'middle' }}>
                              <span style={{ fontWeight: '500', fontFamily: 'monospace' }}>
                                {ingredient.formulationPercent.toFixed(2)}%
                              </span>
                            </td>

                            {/* 100 µm */}
                            <td style={{ padding: '12px', textAlign: 'right', verticalAlign: 'middle' }}>
                              <span style={{ fontFamily: 'monospace' }}>
                                {ingredient.particle100um.toFixed(2)}
                              </span>
                            </td>

                            {/* Batch Quantity */}
                            <td style={{ padding: '12px', textAlign: 'right', verticalAlign: 'middle' }}>
                              <span style={{ fontWeight: '500', fontFamily: 'monospace' }}>
                                {ingredient.batchQuantity.toFixed(2)}
                              </span>
                            </td>

                            {/* Actions */}
                            <td style={{ padding: '12px', textAlign: 'center', verticalAlign: 'middle' }}>
                              <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                                <Button
                                  assistiveText={{ icon: 'Edit' }}
                                  iconCategory="utility"
                                  iconName="edit"
                                  iconSize="small"
                                  iconVariant="border-filled"
                                  variant="icon"
                                />
                                <Button
                                  assistiveText={{ icon: 'Delete' }}
                                  iconCategory="utility"
                                  iconName="delete"
                                  iconSize="small"
                                  iconVariant="border-filled"
                                  variant="icon"
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            {/* Add Phase Button */}
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <Button
                label="Add Phase"
                variant="neutral"
                iconCategory="utility"
                iconName="add"
                iconPosition="left"
              />
            </div>
          </div>

          {/* Summary Table */}
          <div style={{ marginTop: '24px' }}>
            <h4 className="slds-text-heading_small" style={{ marginBottom: '12px' }}>
              Formula Summary
            </h4>
            <table className="slds-table slds-table_bordered slds-table_cell-buffer" style={{ marginBottom: 0 }}>
              <thead>
                <tr className="slds-line-height_reset" style={{ backgroundColor: '#fafaf9' }}>
                  <th scope="col" style={{ padding: '12px' }}>
                    <div className="slds-truncate" style={{ fontWeight: '700', fontSize: '12px' }}>
                      Phase
                    </div>
                  </th>
                  <th scope="col" style={{ padding: '12px', textAlign: 'right' }}>
                    <div className="slds-truncate" style={{ fontWeight: '700', fontSize: '12px' }}>
                      Ingredients
                    </div>
                  </th>
                  <th scope="col" style={{ padding: '12px', textAlign: 'right' }}>
                    <div className="slds-truncate" style={{ fontWeight: '700', fontSize: '12px' }}>
                      Phase Total %
                    </div>
                  </th>
                  <th scope="col" style={{ padding: '12px', textAlign: 'right' }}>
                    <div className="slds-truncate" style={{ fontWeight: '700', fontSize: '12px' }}>
                      Batch Quantity (KG)
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {phases.map((phase) => {
                  const phaseTotal = phase.ingredients.reduce((sum, ing) => sum + ing.formulationPercent, 0);
                  const phaseBatchTotal = phase.ingredients.reduce((sum, ing) => sum + ing.batchQuantity, 0);

                  return (
                    <tr key={phase.id}>
                      <td style={{ padding: '12px' }}>
                        <span style={{ fontWeight: '500' }}>{phase.name}</span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        {phase.ingredients.length}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <span style={{ fontFamily: 'monospace' }}>{phaseTotal.toFixed(2)}%</span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <span style={{ fontFamily: 'monospace' }}>{phaseBatchTotal.toFixed(2)}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{ backgroundColor: '#f3f3f3', fontWeight: '700' }}>
                  <td style={{ padding: '12px' }}>
                    <strong>Total</strong>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <strong>{formula.totalIngredients}</strong>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <strong style={{ fontFamily: 'monospace' }}>100.00%</strong>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <strong style={{ fontFamily: 'monospace' }}>
                      {phases.reduce((sum, phase) =>
                        sum + phase.ingredients.reduce((s, ing) => s + ing.batchQuantity, 0), 0
                      ).toFixed(2)}
                    </strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
};

export default FormulaComponents;
